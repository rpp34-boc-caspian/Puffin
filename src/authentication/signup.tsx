import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationPassword, setConfirmation] = useState('');

  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState({ status: false, reason: '' });
  const [passwordError, setPasswordError] = useState(false);

  function handleSignUp() {
    console.log(`Email ${email}, username ${username}, password ${password}, confirmation ${confirmationPassword}`);

    if (password !== confirmationPassword) {
      setPasswordError(true);
      return;

    };

    setUserError(false);
    setPasswordError(false);
    setEmailError({ status: false, reason: '' });

    axios.post('/signup', {
      email: email,
      username: username,
      password: password
    })
    .then((res) => {
      console.log('RESPONSE', res);
      if (res.data.created) {
        console.log('true')
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmation('');

        // redirect to home / (React Router)

      } else {
        console.log('not true')
        res.data.reason === 'username' ? setUserError(true) : setEmailError({ status: true, reason: 'exists' });
        // MATERIAL UI: Flash username or email, check res.data.result.reason. Flash red around inputs
      }

    })
    .catch(() => {
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmation('');

      // MATERIAL UI: display "Oops, something went wrong, please try again."

    });

  };

  return (
    <>
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
          id="username"
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
          id="password"
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