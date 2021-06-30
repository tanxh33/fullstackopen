import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Notification from './components/Notification';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import User from './components/User';
import UserList from './components/UserList';

import { setNotification } from './reducers/notificationReducer';
import { checkForLogin, logoutUser, loginUser } from './reducers/loginReducer';
import { getUsers } from './reducers/userReducer';

import './index.css';

const App = () => {
  const loggedInUser = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  // Every time the component is rendered, the match will be made.
  const match = useRouteMatch('/users/:id');
  const matchedRouteUser = match ? users.find((u) => u.id === match.params.id) : null;

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    dispatch(checkForLogin());
    dispatch(getUsers());
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

      <Switch>
        <Route path="/users/:id">
          <User user={matchedRouteUser} />
        </Route>

        <Route path="/users">
          <UserList users={users} />
        </Route>

        <Route path="/">
          {loggedInUser === null
            ? <LoginForm handleLogin={handleLogin} />
            : (
              <div>
                <div className="pb-m">
                  <span>{`Logged in as ${loggedInUser.name} `}</span>
                  <button type="button" onClick={handleLogout}>Logout</button>
                  <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
                    <BlogForm />
                  </Toggleable>
                </div>

                <BlogList />
              </div>
            )}
        </Route>
      </Switch>

    </div>
  );
};

export default App;
