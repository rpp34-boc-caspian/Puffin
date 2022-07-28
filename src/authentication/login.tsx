import { useState } from 'react';
import axios from 'axios';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [serverError, setServerError] = useState(false);

  function handleLogin() {
    console.log(`Username is '${username}'. Password is '${password}'.`);

    setLoginError(false);
    setServerError(false);

    axios.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data.exist) {
        setUsername('');
        setPassword('');

        // redirect to home / (React Router)
        return;
      };

      setLoginError(true);

    })
    .catch(() => {
      setUsername('');
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
          helperText={ loginError ? "Username or password is incorrect" : '' }
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
          helperText={ loginError ? "Username or password is incorrect" : '' }
        />
      </div>

      <Button variant="contained" onClick={ () => { handleLogin() } }>Login</Button>

    </>
  );
};

export default Login;