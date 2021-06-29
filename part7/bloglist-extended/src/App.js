import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import { setNotification } from './reducers/notificationReducer';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  // Passed into LoginForm component
  const handleLogin = async (username, password) => {
    try {
      // Send a POST request to API login
      const retrievedUser = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(retrievedUser));
      blogService.setToken(retrievedUser.token);
      setUser(retrievedUser);
      dispatch(setNotification('Login successful', 'success'));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  return (
    <div style={appBodyStyle}>
      <h1 className="pb-s">blogs!</h1>

      <Notification />

      {user === null
        ? <LoginForm handleLogin={handleLogin} />
        : (
          <div>
            <div className="pb-m">
              <span>{`Logged in as ${user.name} `}</span>
              <button type="button" onClick={handleLogout}>Logout</button>
              <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
                <BlogForm />
              </Toggleable>
            </div>

            <BlogList />
          </div>
        )}

    </div>
  );
};

export default App;
