import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


function RequireAuth({ children }: { children: JSX.Element }) {
  let authCookie = Cookies.get('token');
  let location = useLocation();

  if (authCookie === undefined) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    );
  };
  // Declare variable for response from verification route
  let userInfo: object;
  // send cookies to verification route
  axios.get(`/verify/${authCookie}`)
  .then((cookieInfo) => {
    // apply response.data to declared variable
    userInfo = cookieInfo.data;
  })


  // if verification response has no username, id, or iat. route to login
  // maybe pass in username from app component and verify that way as well


  // return children;
};

export default RequireAuth;