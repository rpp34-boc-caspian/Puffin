import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function RequireAuth({ children, user }: { children: JSX.Element, user: Function }) {
  let authCookie = Cookies.get('token');
  let location = useLocation();

  if (authCookie === undefined) {
    console.log('AUTY')
    return (
      <Navigate to="/login" state={{ from: location }} />
      );
    };
    console.log({authCookie})

  let userInfo = {
    id: 0,
    user: '',
    iat: 1,
    correct: false
  }

  axios.get(`http://127.0.0.1:8080/verify/${authCookie}`)
  .then((cookieInfo) => {
    userInfo = cookieInfo.data;
    console.log({userInfo})
    if (!userInfo.correct) {
      return (
        <Navigate to="/login" state={{ from: location }} />
      );
    }
    user(userInfo.id);

    return children;
  });

  return children;
};

export default RequireAuth;