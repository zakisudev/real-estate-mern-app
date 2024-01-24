import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Layout from './pages/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router}>
      <Home />
    </RouterProvider>
  );
};

export default App;
