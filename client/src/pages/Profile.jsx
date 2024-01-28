import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser, errorMsg, loading } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
      <form className="flex flex-col gap-2 w-[400px] justify-center mx-auto">
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <img
          src={currentUser.photoUrl}
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />
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
        <label htmlFor="password" className="font-bold uppercase">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-400 rounded-md px-2 py-1 text-lg"
        />
        <label htmlFor="confirmPassword" className="font-bold uppercase">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="border border-gray-400 rounded-md px-2 py-1 text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-blue-900 transition-colors font-bold"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
