import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';
import { profileUpdate } from '../../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const photoRef = useRef(null);
  const { currentUser, errorMsg, loading } = useSelector((state) => state.user);
  const [pic, setPic] = useState(null);
  const [picPercentage, setPicPercentage] = useState(0);
  const [picError, setPicError] = useState(false);
  const [formData, setFormData] = useState({});

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

      if (res.success) {
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

  useEffect(() => {
    if (pic) {
      handleUploadPic(pic);
    }
  }, [pic]);

  return (
    <div className="w-[400px] flex flex-col justify-center items-center mx-auto">
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
          <p className="text-green-500 text-center">Uploaded successfully</p>
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
              setFormData({ ...formData, password: e.target.value })
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
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-blue-900 transition-colors font-bold"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className="flex justify-center w-full mt-5">
        <button className="bg-red-700 text-white rounded-md px-2 py-1 mt-2 uppercase hover:bg-red-900 transition-colors font-bold">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default Profile;
