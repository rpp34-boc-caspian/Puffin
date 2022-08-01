import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import CircularProgress from '@mui/material/CircularProgress';

function Logout({ user }: { user: Function }) {
  const location = useLocation();

  Cookies.remove('token');

  user(0);

  <Navigate to="/login" state={{ from: location }} />

  return (
    <>
      <CircularProgress />
    </>
  );
}

export default Logout;