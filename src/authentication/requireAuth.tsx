import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function RequireAuth({ children, user }: { children: JSX.Element; user: Function }) {
  let authCookie = Cookies.get('token');
  const navigateTo = useNavigate();

  if (authCookie === undefined) {
    navigateTo('/login');

  };

  let userInfo = {
    id: 0,
    user: '',
    iat: 1,
    correct: false
  }

  axios.get(`http://127.0.0.1:8080/verify/${authCookie}`)
  .then((cookieInfo) => {
    userInfo = cookieInfo.data;

    if (!userInfo.correct) {
      navigateTo('/login');

    };

    user(userInfo.id);

    return children;
  });

  return children;
};

export default RequireAuth;