import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState(false);

  function handleLogin() {
    console.log(`Username is '${username}'. Password is '${password}'.`);

    setLoginError(false);

    axios.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data.exist) {
        setUsername('');
        setPassword('');

        // redirect to home / (???)
        return;
      };

      setLoginError(true);

    })
    .catch(() => {
      setUsername('');
      setPassword('');

      // MATERIAL UI: display "Oops, something went wrong, please try again."

    });

  };

  return (
    <>
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