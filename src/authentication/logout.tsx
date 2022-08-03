import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function Logout({ user }: { user: Function }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log('USING EFFECT')
    Cookies.remove('token');
    user(0);

    navigateTo('/login');
  }, [user, navigateTo]);



  return (
    <>
    </>
  );
}

export default Logout;