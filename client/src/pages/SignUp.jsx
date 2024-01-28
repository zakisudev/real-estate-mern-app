import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (res.status) {
        setErrorMsg('');
        setLoading(false);
        navigate('/signin');
      } else {
        setErrorMsg(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error?.message);
      setErrorMsg(error?.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col items-center p-3">
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />

        {errorMsg && (
          <p className="text-red-500 text-center font-semibold my-2">
            {errorMsg}
          </p>
        )}

        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 mb-3 transition-all"
          type="submit"
        >
          {loading ? 'Please wait' : 'Sign Up'}
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
