import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser } from '../../services/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLoginFail,
  userLoginSuccess,
  userLoginRequest,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, errorMsg } = useSelector((state) => state.user);

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest());
    try {
      const res = await signinUser(formData);
      if (res.status) {
        dispatch(userLoginSuccess(res?.user));
        toast.success('Signin successful');
        navigate('/', { replace: true });
      } else {
        dispatch(userLoginFail(res.message));
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(userLoginFail(error.message));
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

        {errorMsg && (
          <p className="text-red-500 text-center font-semibold">{errorMsg}</p>
        )}

        <button
          disabled={loading}
          className="bg-blue-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-80 mb-3 transition-all"
          type="submit"
        >
          {loading ? 'Please wait' : 'Sign in'}
        </button>
        <OAuth />
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
