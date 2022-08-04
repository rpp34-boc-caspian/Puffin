import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import theme from '../theme';


function Login({ user }: { user: Function }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.log('RESPONSE',res);
      if (res.data.exists) {
        setUsername('');
        setEmail('');
        setPassword('');

        user(res.data.id);
        Cookies.set('token', res.data.cookie);

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

        <Typography variant="h3" color="primary" style={{ fontWeight: 600 }} align="center" mt={ 5 } component="div">
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

          <Typography variant="h4" align="left" component="div">
            Sign In
          </Typography>

          <TextField
            error={ loginError }
            id="login-username"
            label="Username"
            type="text"
            margin="dense"
            sx={{ width: 300 }}
            value={ username }
            onChange={ (e) => { setUsername(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ loginError ? "Username, email, or password is incorrect" : '' }
          />

          <TextField
            error={ loginError }
            id="login-email"
            label="Email"
            type="text"
            margin="dense"
            sx={{ width: 300 }}
            value={ email }
            onChange={ (e) => { setEmail(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ loginError ? "Username, email, or password is incorrect" : '' }
          />

          <TextField
            error={ loginError }
            id="login-password"
            label="Password"
            type="password"
            margin="dense"
            sx={{ width: 300 }}
            value={ password }
            onChange={ (e) => { setPassword(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ loginError ? "Username, email, or password is incorrect" : '' }
          />

          <Box p={ 2 } sx={{ width: 300 }}>
            <Button fullWidth data-testid="login-btn" variant="contained" onClick={ () => { handleLogin() } }>Sign In</Button>
          </Box>

          <Box>
            <Typography component="span">
              Don't have an account?
            </Typography>

            <Typography
              component="span"
              color="secondary"
              style={{ fontWeight: 600 }}
              onClick={ () => { navigateTo('/signup') } }>

              &nbsp;Sign up
            </Typography>
          </Box>

        </Grid>


      </ThemeProvider>
  );
};

export default Login;