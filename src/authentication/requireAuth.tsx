import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


function RequireAuth({ children }: { children: JSX.Element }) {
  // Get token cookie

  // Declare variable for response from verification route

  // if no token cookie, route to login


  // send cookies to verification route

    // apply response.data to declared variable


  // if verification response has no username, id, or iat. route to login
  // maybe pass in username from app component and verify that way as well


  // return children;
};

export default RequireAuth;