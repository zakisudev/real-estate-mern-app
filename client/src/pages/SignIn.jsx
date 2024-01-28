import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signinUser } from '../../services/api';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await signinUser(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSignin} className="flex flex-col items-center p-3">
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 mb-3 transition-all"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <div className="flex gap-2 mt-2 justify-center items-center">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup" className="text-blue-700 hover:underline font-bold">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
