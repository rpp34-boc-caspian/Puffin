import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';


function Login({ user }: { user: Function }) {
  const [username, setUsername] = useState('JIT');
  const [email, setEmail] = useState('amplesample@email.com');
  const [password, setPassword] = useState('password123');

  const [loginError, setLoginError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const navigateTo = useNavigate();

  function handleLogin() {
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

        user(res.data.id);
        Cookies.set('token', res.data.cookie, { path: '/' });

        navigateTo('/');
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
      <ThemeProvider theme={theme}>

        <Typography variant="h4" color="primary" align="center" mt={ 5 } component="div">
          Puffin
        </Typography>

        <Grid
          container
          spacing={ 0 }
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '75vh' }}
        >

          {
            serverError ? <Alert severity="error">Oops, something went wrong, please try again</Alert> : <></>
          }

          <Box
            mt={ 15 }
            mb={ 15 }
          >
            <h3>Placeholder for GIF or video</h3>

          </Box>

          <Box>
            <Typography variant="h4" align="left" component="div">
              Sign In
            </Typography>
          </Box>

          <Box>
            <TextField
              error={ loginError }
              id="login-username"
              label="Username"
              margin="dense"
              sx={{ width: 300 }}
              type="text"
              value={ username }
              onChange={ (e) => { setUsername(e.target.value) } }
              autoComplete="current-password"
              variant="standard"
              helperText={ loginError ? "Username, email, or password is incorrect" : '' }
            />
          </Box>
          <Box>
            <TextField
              error={ loginError }
              id="login-email"
              label="Email"
              margin="dense"
              sx={{ width: 300 }}
              type="text"
              value={ email }
              onChange={ (e) => { setEmail(e.target.value) } }
              autoComplete="current-password"
              variant="standard"
              helperText={ loginError ? "Username, email, or password is incorrect" : '' }
            />
          </Box>
          <Box>
            <TextField
              error={ loginError }
              id="login-password"
              label="Password"
              margin="dense"
              sx={{ width: 300 }}
              type="password"
              value={ password }
              onChange={ (e) => { setPassword(e.target.value) } }
              autoComplete="current-password"
              variant="standard"
              helperText={ loginError ? "Username, email, or password is incorrect" : '' }
            />
          </Box>

          <Box
            p={ 2 }
            sx={{ width: 300 }}
          >
            <Button fullWidth variant="contained" onClick={ () => { handleLogin() } }>Login</Button>
          </Box>

        </Grid>
      </ThemeProvider>
  );
};

export default Login;