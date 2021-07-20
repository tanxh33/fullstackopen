import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({
  show, setPage, setNotification, setToken,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors.length > 0) {
        setNotification(graphQLErrors[0].message, 'error');
      }
      if (networkError) {
        setNotification(networkError, 'error');
      }
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('library-user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
    setPage('authors');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>login</h2>

      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
