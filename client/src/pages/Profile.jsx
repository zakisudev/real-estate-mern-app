import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
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

  useEffect(() => {
    if (pic) {
      handleUploadPic(pic);
    }
  }, [pic]);

  return (
    <div className="w-[400px] flex flex-col justify-center items-center mx-auto">
      <h1 className="text-3xl font-semibold text-center my-3">Profile</h1>
      <form className="flex flex-col gap-3 w-full justify-center mx-auto">
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <input
          type="file"
          ref={photoRef}
          hidden
          accept="image/.*"
          onChange={(e) => setPic(e.target.files[0])}
        />
        <img
          onClick={() => photoRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto cursor-pointer"
        />

        {picError ? (
          <p className="text-red-700 text-center">
            Error uploading profile picture
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
            value={currentUser.username}
            className="border border-gray-400 rounded-md px-2 py-1 text-lg"
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
            value={currentUser.email}
            className="border border-gray-400 rounded-md px-2 py-1 text-lg"
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
            className="border border-gray-400 rounded-md px-2 py-1 text-lg"
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
            className="border border-gray-400 rounded-md px-2 py-1 text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-blue-900 transition-colors font-bold"
        >
          Update
        </button>
      </form>

      <div className="flex justify-between w-full mt-5">
        <button className="bg-red-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-red-900 transition-colors font-bold">
          Delete account
        </button>

        <button className="bg-gray-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-gray-900 transition-colors font-bold">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
