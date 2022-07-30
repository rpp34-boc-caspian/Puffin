import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function RequireAuth({ children, user }: { children: JSX.Element, user: Function }) {
  let authCookie = Cookies.get('token');
  let location = useLocation();

  if (authCookie === undefined) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    );
  };

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