import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-blue-500">Real</span>
          <span className="text-red-500">Estate</span>
        </Link>
        <form className="bg-slate-100 rounded-lg px-2 py-1 w-24 sm:w-64 flex">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none w-full rounded-md"
          />
          <button className="text-slate-300 rounded-lg px-1 py-1">
            <FaSearch />
          </button>
        </form>
        <ul className="flex items-center">
          <li className="mx-2 hidden sm:flex">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2 hidden sm:flex">
            <Link to="about">About</Link>
          </li>
          <li className="mx-2">
            <Link to="signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;