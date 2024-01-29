import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';
import {
  deleteListing,
  deleteUser,
  profileUpdate,
  updateListing,
} from '../../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photoRef = useRef(null);
  const { currentUser, errorMsg, loading } = useSelector((state) => state.user);
  const [pic, setPic] = useState(null);
  const [picPercentage, setPicPercentage] = useState(0);
  const [picError, setPicError] = useState(false);
  const [formData, setFormData] = useState({});
  const [viewListings, setViewListings] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [fetchingListings, setFetchingListings] = useState(false);

  const handleUploadPic = (pic) => {
    const storage = getStorage(app);
    const picName = new Date().getTime() + pic.name;
    const storageRef = ref(storage, picName);
    const uploadTask = uploadBytesResumable(storageRef, pic);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setPicError(false);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPicPercentage(Math.round(progress));
      },
      (error) => {
        setPicError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      if (formData.password !== formData.confirmPassword) {
        dispatch(updateUserFail('Passwords do not match'));
        return;
      }

      dispatch(updateUserStart());
      const res = await profileUpdate(formData, currentUser._id);

      if (res.status) {
        dispatch(updateUserSuccess(res.data));
        toast.success('Profile updated successfully');
        return;
      } else {
        dispatch(updateUserFail(res.message));
        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(updateUserFail(error?.message));
    }
  };

  const handleDeleteProfile = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action is irreversible'
      )
    ) {
      return;
    }
    try {
      dispatch(deleteUserStart());
      const res = await deleteUser(currentUser._id);
      if (res.status) {
        dispatch(deleteUserSuccess());
        toast.success('Account deleted successfully');
        navigate('/login');
        return;
      } else {
        dispatch(deleteUserFail(res.message));
        toast.error(res.message);
        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFail(error.message));
    }
  };

  const handleUserListings = async () => {
    setViewListings(!viewListings);
    if (viewListings) {
      setUserListings([]);
      return;
    }
    setFetchingListings(true);
    try {
      const res = await updateListing(currentUser._id);
      if (res.status) {
        setUserListings(res?.listings);
        setFetchingListings(false);
        return;
      } else {
        toast.error(res.message);
        setFetchingListings(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setFetchingListings(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }
    try {
      const res = await deleteListing(id);
      if (res.status) {
        toast.success('Listing deleted successfully');
        return;
      } else {
        toast.error(res.message);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (pic) {
      handleUploadPic(pic);
    }
  }, [pic]);

  return (
    <div className="w-full sm:w-[80%] min-h-full flex flex-col justify-center items-center mx-auto">
      <div className="h-full flex gap-5 flex-col sm:flex-row sm:max-h-[500px]">
        <div className="flex flex-col w-[360px] h-full">
          <h1 className="text-3xl font-semibold text-center my-3">Profile</h1>

          <form
            onSubmit={handleProfileUpdate}
            className="flex flex-col gap-3 w-full justify-center mx-auto"
          >
            <input
              type="file"
              ref={photoRef}
              hidden
              accept="image/.*"
              onChange={(e) => setPic(e.target.files[0])}
            />
            <img
              onClick={() => photoRef.current.click()}
              src={formData?.avatar || currentUser?.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto cursor-pointer object-cover"
            />

            {picError ? (
              <p className="text-red-700 text-center">
                Error uploading profile picture <br />
                picture must be less than 4mb
              </p>
            ) : picPercentage > 0 && picPercentage < 100 ? (
              <p className="text-gray-500 text-center">
                Uploading {picPercentage}%
              </p>
            ) : picPercentage === 100 ? (
              <p className="text-green-500 text-center">
                Uploaded successfully
              </p>
            ) : (
              ''
            )}

            <div className="flex justify-between items-center gap-2">
              <label htmlFor="username" className="font-bold uppercase">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData?.username || currentUser?.username}
                className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <label htmlFor="email" className="font-bold uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData?.email || currentUser?.email}
                className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <label htmlFor="password" className="font-bold uppercase">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData?.password}
                className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target?.value })
                }
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <label htmlFor="confirmPassword" className="font-bold uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData?.confirmPassword}
                className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target?.value })
                }
              />
            </div>

            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-blue-900 transition-colors font-bold"
            >
              {loading ? 'Please wait...' : 'Update'}
            </button>

            <Link
              to="/create-listing"
              className="bg-green-700 text-center text-white rounded-md p-2 mt-2 uppercase hover:bg-green-900 transition-colors font-bold"
            >
              Create Listing
            </Link>
          </form>
        </div>

        <div className="flex flex-col w-[360px]">
          <div className="flex justify-center mt-5">
            <button
              onClick={handleUserListings}
              disabled={fetchingListings}
              className="rounded-md px-2 py-1 mt-2 uppercase hover:bg-gray-200 transition-colors font-bold"
            >
              {viewListings
                ? fetchingListings
                  ? 'Getting Listings...'
                  : 'Hide listings'
                : 'View listings'}
            </button>
          </div>

          {viewListings && (
            <div className="flex flex-col gap-3 w-full justify-center mx-auto my-5 max-h-[500px]">
              {userListings && userListings?.length > 0 ? (
                userListings?.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex justify-between gap-3 w-full h-16 mx-auto"
                  >
                    <Link
                      to={`/listing/${listing._id}`}
                      className="w-full rounded-md"
                    >
                      <img
                        src={listing?.imageURLs[0]}
                        alt="listing"
                        className="w-full h-16 object-cover rounded-md"
                      />
                    </Link>
                    <div className="flex flex-col w-full justify-center mx-auto h-16">
                      <h1 className="text-lg font-semibold text-center">
                        {listing?.title}
                      </h1>
                      <p className="text-center text-gray-500 flex-1">
                        {listing?.description}
                      </p>
                      <p className="text-center text-gray-500">
                        {listing?.regularPrice} ETB
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                      <Link
                        to={`/edit-listing/${listing._id}`}
                        className="bg-blue-700 text-white rounded-md px-2 py-1 uppercase hover:bg-blue-900 transition-colors font-bold text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="bg-red-700 text-white rounded-md px-2 py-1 uppercase hover:bg-red-900 transition-colors font-bold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No listings found</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end w-full mt-5 mr-2">
        <button
          onClick={handleDeleteProfile}
          className="bg-red-700 text-white rounded-md px-2 py-1 uppercase hover:bg-red-900 transition-colors font-bold text-sm"
        >
          {loading ? 'Please wait...' : 'Delete account'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
