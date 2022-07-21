import { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSignUp() {

  };

  return (
    <>
      <div>
        <label>
          Password:
          <input type="text" value={ email } onChange={ (e) => { setEmail(e.target.value) } }/>
        </label>
      </div>
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

      <input type="button" value="Login" onClick={ () => { handleSignUp() } } />

    </>
  );
};

export default SignUp;