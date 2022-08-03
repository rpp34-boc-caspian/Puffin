import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import theme from '../theme';

function SignUp({ user }: { user: Function }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmation] = useState('');

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState({ status: false, reason: '' });
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const navigateTo = useNavigate();

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function handleSignUp() {
    if (!validateEmail(email)) {
      setEmailError({ status: true, reason: 'format' });
      return;

    };

    if (password !== confirmationPassword) {
      setPasswordError(true);
      return;

    };

    setUserError(false);
    setPasswordError(false);
    setEmailError({ status: false, reason: '' });
    setServerError(false);

    axios.post('http://localhost:8080/signup', {
      email: email,
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data.created) {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmation('');

        user(res.data.id);

        navigateTo('/');

        return;
      };

      res.data.reason === 'username' ? setUserError(true) : setEmailError({ status: true, reason: 'exists' });

    })
    .catch(() => {
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmation('');

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

        <Box>
          <Typography variant="h4" style={{ fontWeight: 600 }} align="left" component="div">
            Sign Up
          </Typography>
        </Box>

        <Box>
          <TextField
            error={ emailError.status }
            id="email"
            label="Email"
            type="email"
            margin="dense"
            sx={{ width: 300 }}
            value={ email }
            onChange={ (e) => { setEmail(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ emailError.reason !== 'exists' ? emailError.reason === 'format' ? 'Please enter a valid email' : '' : 'Email is already in use' }
          />
        </Box>
        <Box>
          <TextField
            error={ userError }
            id="signup-username"
            label="Username"
            type="text"
            margin="dense"
            sx={{ width: 300 }}
            value={ username }
            onChange={ (e) => { setUsername(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ userError ? "Username is already taken" : '' }
          />
        </Box>
        <Box>
          <TextField
            error={ passwordError }
            id="signup-password"
            label="Password"
            type="password"
            margin="dense"
            sx={{ width: 300 }}
            value={ password }
            onChange={ (e) => { setPassword(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ passwordError ? "Passwords do not match" : '' }
          />
        </Box>
        <Box>
          <TextField
            error={ passwordError }
            id="password-confirmation"
            label="Confirm Password"
            type="password"
            margin="dense"
            sx={{ width: 300 }}
            value={ confirmationPassword }
            onChange={ (e) => { setConfirmation(e.target.value) } }
            autoComplete="current-password"
            variant="standard"
            helperText={ passwordError ? "Passwords do not match" : '' }
          />
        </Box>

        <Box p={ 2 } sx={{ width: 300 }} >
          <Button fullWidth variant="contained" onClick={ () => { handleSignUp() } }>Sign Up</Button>
        </Box>

      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;