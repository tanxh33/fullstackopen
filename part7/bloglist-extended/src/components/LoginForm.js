import React, { useState } from 'react';
import { Button, Input } from '../Styled/Components';

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    loginHandler(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={login}>
        <div>
          Username
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button primary id="login-button" type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
