import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import CircularProgress from '@mui/material/CircularProgress';

function Logout({ user }: { user: Function }) {
  const navigateTo = useNavigate();

  Cookies.remove('token');

  user(0);

  navigateTo('/');

  return (
    <>
      <CircularProgress />
    </>
  );
}

export default Logout;