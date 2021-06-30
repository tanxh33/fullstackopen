import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username, password));
      dispatch(setNotification('Login successful', 'success'));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'));
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={login}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
