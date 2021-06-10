import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({ message: null, type: '' });
  const notificationDuration = 5000;

  const blogFormRef = useRef();

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

  // Initialise blog list
  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
  }, []);

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const setTempNotification = (message, type, duration) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: '' });
    }, duration);
  };

  // Passed into LoginForm component
  const handleLogin = async (username, password) => {
    try {
      // Send a POST request to API login
      const retrievedUser = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(retrievedUser));
      blogService.setToken(retrievedUser.token);
      setUser(retrievedUser);
      setTempNotification('Login successful', 'success', notificationDuration);
    } catch (exception) {
      setTempNotification('Wrong username or password', 'error', notificationDuration);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  // Passed into BlogForm component
  const addBlog = async (blogObject) => {
    try {
      // Send a POST request to API blog
      await blogService.create(blogObject);
      // Refresh blog list
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setTempNotification(`Blog added: ${blogObject.title} by ${blogObject.author}`, 'success', notificationDuration);
      blogFormRef.current.toggleVisibility(); // Hide form after new blog created.
    } catch (exception) {
      setTempNotification('Adding blog failed', 'error', notificationDuration);
    }
  };

  return (
    <div style={appBodyStyle}>
      <h1 className="pb-s">blogs!</h1>

      <Notification message={notification.message} type={notification.type} />

      {user === null
        ? <LoginForm handleLogin={handleLogin} />
        : (
          <div>
            <div className="pb-m">
              <span>{`Logged in as ${user.name} `}</span>
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Toggleable>
          </div>
        )}

    </div>
  );
};

export default App;
