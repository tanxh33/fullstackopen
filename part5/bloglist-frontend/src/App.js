import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import BlogForm from './components/BlogForm';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({ message: null, type: '' });
  const notificationDuration = 5000;

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to API login
      const retrievedUser = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(retrievedUser));
      blogService.setToken(retrievedUser.token);
      setUser(retrievedUser);
      setUsername('');
      setPassword('');
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

  const addBlog = async (blogObject) => {
    try {
      // Send a POST request to API blog
      await blogService.create(blogObject);
      // Refresh blog list
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setTempNotification(`Blog added: ${blogObject.title} by ${blogObject.author}`, 'success', notificationDuration);
    } catch (exception) {
      setTempNotification('Adding blog failed', 'error', notificationDuration);
    }
  };

  const loginForm = () => (
    <div>
      <h2 className="pb-s">Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div className="pb-s">
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="pb-s">
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  return (
    <div style={appBodyStyle}>
      <h1 className="pb-s">blogs!</h1>

      <Notification message={notification.message} type={notification.type} />

      {user === null
        ? loginForm()
        : (
          <div>
            <div className="pb-m">
              <span>{`Logged in as ${user.name} `}</span>
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            <Toggleable buttonLabel="Add new blog">
              <BlogForm createBlog={addBlog} />
            </Toggleable>
          </div>
        )}

    </div>
  );
};

export default App;
