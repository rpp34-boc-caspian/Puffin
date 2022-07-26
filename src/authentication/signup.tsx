import { useState } from 'react';
import axios from 'axios';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationPassword, setConfirmation] = useState('');

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState({ status: false, reason: '' });
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function handleSignUp() {
    console.log(`Email ${email}, username ${username}, password ${password}, confirmation ${confirmationPassword}`);

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

    axios.post('/signup', {
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

        // redirect to home / (React Router)
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
    <>

      {
        serverError ? <Alert severity="error">Oops, something went wrong, please try again</Alert> : <></>
      }

      <div>
        <TextField
          error={ emailError.status }
          id="email"
          label="Email"
          type="email"
          value={ email }
          onChange={ (e) => { setEmail(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ emailError.reason !== 'exists' ? emailError.reason === 'format' ? 'Please enter a valid email' : '' : 'Email is already in use' }
        />
      </div>
      <div>
        <TextField
          error={ userError }
          id="signup-username"
          label="Username"
          type="text"
          value={ username }
          onChange={ (e) => { setUsername(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ userError ? "Username is already taken" : '' }
        />
      </div>
      <div>
        <TextField
          error={ passwordError }
          id="signup-password"
          label="Password"
          type="password"
          value={ password }
          onChange={ (e) => { setPassword(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ passwordError ? "Passwords do not match" : '' }
        />
      </div>
      <div>
        <TextField
          error={ passwordError }
          id="password-confirmation"
          label="Confirm Password"
          type="password"
          value={ confirmationPassword }
          onChange={ (e) => { setConfirmation(e.target.value) } }
          autoComplete="current-password"
          variant="standard"
          helperText={ passwordError ? "Passwords do not match" : '' }
        />
      </div>

      <Button variant="contained" onClick={ () => { handleSignUp() } }>Sign Up</Button>

    </>
  );
};

export default SignUp;