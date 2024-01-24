import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col items-center p-3">
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="text"
          placeholder="Username"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="email"
          placeholder="Email"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="password"
          placeholder="Password"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 mb-3 transition-all"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-2 justify-center items-center">
        <p>Already have an account?</p>
        <Link to="/signin" className="text-blue-700 hover:underline font-bold">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
