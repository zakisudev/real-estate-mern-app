import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  userLogoutFail,
  userLogoutStart,
  userLogoutSuccess,
} from '../redux/user/userSlice';
import { logoutUser } from '../../services/api';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { currentUser } = useSelector((state) => state.user);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDown = () => {
    showDropDown ? setShowDropDown(false) : setShowDropDown(true);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(userLogoutStart());
    try {
      const res = await logoutUser();
      if (res.status) {
        dispatch(userLogoutSuccess());
        navigate('/');
      } else {
        dispatch(userLogoutFail(res.message));
      }
    } catch (error) {
      dispatch(userLogoutFail(error.message));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        return;
      } else {
        setShowDropDown(false);
      }
    });
  }, [currentUser]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get('searchTerm');
    setSearchTerm(term);
  }, [location.search]);

  return (
    <header className="bg-slate-200 z-20">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-blue-700">Real</span>
          <span className="text-red-700">Estate</span>
        </Link>
        <form
          onSubmit={handleSearch}
          className="bg-slate-100 rounded-lg px-2 py-1 w-24 sm:w-64 flex"
        >
          <input
            type="text"
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="focus:outline-none w-full rounded-md"
          />
          <button className="text-slate-300 rounded-lg px-1 py-1">
            <FaSearch />
          </button>
        </form>
        <ul className="flex items-center h-full">
          <li className="mx-2 hidden sm:flex">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2 hidden sm:flex">
            <Link to="about">About</Link>
          </li>
          {currentUser ? (
            <li className="mx-2 relative z-50">
              <button onClick={handleDropDown}>
                <img
                  src={currentUser?.avatar}
                  alt="avatar"
                  className="pt-1 w-8 h-8 rounded-full object-cover"
                />
                <div
                  className={
                    showDropDown
                      ? 'flex flex-col justify-center items-center px-2 py-1 bg-white rounded-lg absolute top-10 right-0'
                      : 'hidden'
                  }
                >
                  <Link to="/profile" className="text-lg font-semibold">
                    Profile
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="text-lg text-slate-600"
                  >
                    Logout
                  </span>
                </div>
              </button>
            </li>
          ) : (
            <li className="mx-2">
              <Link to="signin">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
