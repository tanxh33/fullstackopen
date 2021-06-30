import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, Link, useRouteMatch, useHistory,
} from 'react-router-dom';

import Notification from './components/Notification';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import User from './components/User';
import UserList from './components/UserList';

import { setNotification } from './reducers/notificationReducer';
import { checkForLogin, logoutUser, loginUser } from './reducers/loginReducer';
import { getBlogs, deleteBlog, likeBlog } from './reducers/blogReducer';
import { getUsers } from './reducers/userReducer';

import './index.css';

const App = () => {
  const loggedInUser = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();

  const blogFormRef = useRef();

  // Every time the component is rendered, the match will be made.
  const matchUser = useRouteMatch('/users/:id');
  const matchBlog = useRouteMatch('/blogs/:id');
  const matchedRouteUser = matchUser ? users.find((u) => u.id === matchUser.params.id) : null;
  const matchedRouteBlog = matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null;

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    dispatch(checkForLogin());
    dispatch(getBlogs());
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

  // Passed into Blog component
  const likeBlogHandler = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    try {
      await dispatch(likeBlog(id, blog));
    } catch (exception) {
      if (exception.response.data.error === 'token expired') {
        dispatch(setNotification('Your login has expired', 'error'));
        dispatch(logoutUser());
      } else {
        dispatch(setNotification('Like blog failed', 'error'));
      }
    }
  };

  // Passed into Blog component
  const deleteBlogHandler = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(id));
        dispatch(setNotification('Blog deleted', 'success'));
        history.push('/');
      } catch (exception) {
        if (exception.response.data.error === 'token expired') {
          dispatch(setNotification('Your login has expired', 'error'));
          dispatch(logoutUser());
        } else {
          dispatch(setNotification('Delete blog failed', 'error'));
        }
      }
    }
  };

  return (
    <div style={appBodyStyle}>
      <h1 className="pb-s">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          blogs!
        </Link>
      </h1>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User user={matchedRouteUser} />
        </Route>

        <Route path="/users">
          <UserList users={users} />
        </Route>

        <Route path="/blogs/:id">
          <Blog
            blog={matchedRouteBlog}
            expanded
            likeBlog={() => likeBlogHandler(matchedRouteBlog.id)}
            deleteBlog={() => deleteBlogHandler(matchedRouteBlog.id)}
          />
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

                <BlogList
                  blogs={blogs}
                  likeBlogHandler={likeBlogHandler}
                  deleteBlogHandler={deleteBlogHandler}
                />
              </div>
            )}
        </Route>
      </Switch>

    </div>
  );
};

export default App;
