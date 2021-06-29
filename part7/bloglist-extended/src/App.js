import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import { checkForLogin, logoutUser, loginUser } from './reducers/userReducer';
import './index.css';

import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    dispatch(checkForLogin());
  }, []);

  const handleLogin = async (username, password) => {
    let success;
    try {
      await dispatch(loginUser(username, password));
      dispatch(setNotification('Login successful', 'success'));
      success = true;
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'));
      success = false;
    }
    return success;
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
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
