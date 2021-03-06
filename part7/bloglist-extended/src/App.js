import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, useRouteMatch, useHistory,
} from 'react-router-dom';

import Notification from './components/Notification';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import User from './components/User';
import UserList from './components/UserList';

import { setNotification } from './reducers/notificationReducer';
import { checkForLogin, loginUser, logoutUser } from './reducers/loginReducer';
import { getBlogs, deleteBlog, likeBlog } from './reducers/blogReducer';
import { getUsers } from './reducers/userReducer';

import { GlobalStyle } from './Styled/Global';
import { Container } from './Styled/Components';
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

  // On load, check if there is a logged-in user from local storage
  // and retrieve all info from API
  useEffect(() => {
    dispatch(checkForLogin());
    dispatch(getBlogs());
    dispatch(getUsers());
  }, []);

  // Passed into <LoginForm /> so it doesn't cause problems when it un-renders
  const loginHandler = async (username, password) => {
    try {
      await dispatch(loginUser(username, password));
      dispatch(setNotification('Login successful', 'success'));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'danger'));
    }
  };

  // Passed into Blog component
  const likeBlogHandler = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    try {
      await dispatch(likeBlog(id, blog));
    } catch (exception) {
      if (exception.response.data.error === 'token expired') {
        dispatch(setNotification('Your login has expired', 'danger'));
        dispatch(logoutUser());
      } else {
        dispatch(setNotification('Like blog failed', 'danger'));
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
          dispatch(setNotification('Your login has expired', 'danger'));
          dispatch(logoutUser());
        } else {
          dispatch(setNotification('Delete blog failed', 'danger'));
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar user={loggedInUser} />
      <Container>
        <Notification />
        <h1 className="mb-s">blogs!</h1>

        {loggedInUser === null
          ? <LoginForm loginHandler={loginHandler} />
          : (
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
                  likeBlog={() => likeBlogHandler(matchedRouteBlog.id)}
                  deleteBlog={() => deleteBlogHandler(matchedRouteBlog.id)}
                />
              </Route>

              <Route path="/">
                <div>
                  <div className="pb-m">
                    <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
                      <BlogForm />
                    </Toggleable>
                  </div>
                  <BlogList blogs={blogs} />
                </div>
              </Route>
            </Switch>
          )}
      </Container>
    </>
  );
};

export default App;
