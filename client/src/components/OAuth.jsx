import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInWithGoogle } from '../../services/api';
import { userLoginFail, userLoginSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await signInWithGoogle({
        username: result.user?.displayName,
        email: result.user?.email,
        photoURL: result.user?.photoURL,
      });

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
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="
    bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-80 mb-3 transition-all uppercase
  "
    >
      Continue with google
    </button>
  );
};

export default OAuth;
