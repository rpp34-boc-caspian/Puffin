import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function Login() {
  const [username, setUsername] = useState('JIT');
  const [email, setEmail] = useState('amplesample@email.com');
  const [password, setPassword] = useState('password123');

  const [loginError, setLoginError] = useState(false);
  const [serverError, setServerError] = useState(false);


  function handleLogin() {
    console.log(`Username is '${username}'. Email is ${email} Password is '${password}'.`);

    setLoginError(false);
    setServerError(false);

    axios.post('http://127.0.0.1:8080/login', {
      username: username,
      email: email,
      password: password
    })
    .then((res) => {
      if (res.data.exists) {
        setUsername('');
        setEmail('');
        setPassword('');
        Cookies.set('token', res.data.cookie, { path: '/' });
        // redirect to home / (React Router)
        return;
      };

      setLoginError(true);

    })
    .catch((err) => {
      setUsername('');
      setEmail('');
      setPassword('');

      setServerError(true);

    });

  };

  return (
    <>

      {
        serverError ? <Alert severity="error">Oops, something went wrong, please try again</Alert> : <></>
      }

      <div>
        <TextField
          error={ loginError }
          id="login-username"
          label="Username"
          type="text"
          value={ username }
          onChange={ (e) => { setUsername(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ loginError ? "Username, email, or password is incorrect" : '' }
        />
      </div>
      <div>
        <TextField
          error={ loginError }
          id="login-email"
          label="Email"
          type="text"
          value={ email }
          onChange={ (e) => { setEmail(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ loginError ? "Username, email, or password is incorrect" : '' }
        />
      </div>
      <div>
        <TextField
          error={ loginError }
          id="login-password"
          label="Password"
          type="password"
          value={ password }
          onChange={ (e) => { setPassword(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ loginError ? "Username, email, or password is incorrect" : '' }
        />
      </div>

      <Button variant="contained" onClick={ () => { handleLogin() } }>Login</Button>

    </>
  );
};

export default Login;