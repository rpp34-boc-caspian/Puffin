import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout({ user }: { user: Function }) {
  // get location
  let location = useLocation();
  // Remove cookie
  Cookies.remove('token');
  // set user to 0
  user(0);
  // navigate to /login
  <Navigate to="/login" state={{ from: location }} />
  // return a spinning circle?
}

export default Logout;