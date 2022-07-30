import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

interface userInfo {
  id: string;
  user: string;
  iat: number;
  correct: boolean;
}

function RequireAuth({ children, user }: { children: JSX.Element, user: Function }) {
  let authCookie = Cookies.get('token');
  let location = useLocation();

  if (authCookie === undefined) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    );
  };
  console.log('cookie', authCookie);
  let userInfo = {
    id: 0,
    user: '',
    iat: 1,
    correct: false
  }

  axios.get(`/verify/${authCookie}`)
  .then((cookieInfo) => {
    userInfo = cookieInfo.data;
  });

  if (!userInfo.correct) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    );
  }

  user(userInfo.id);

  return children;
};

export default RequireAuth;