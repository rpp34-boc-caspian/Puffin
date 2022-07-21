import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    console.log(`Username is '${username}'. Password is '${password}'.`);

    axios.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log(res.data);
    });

  };

  return (
    <>
      <div>
        <label>
          Username:
          <input type="text" value={ username } onChange={ (e) => { setUsername(e.target.value) } } />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={ password } onChange={ (e) => { setPassword(e.target.value) } }/>
        </label>
      </div>

      <input type="button" value="Login" onClick={ () => { handleLogin() } } />

    </>
  );
};

export default Login;