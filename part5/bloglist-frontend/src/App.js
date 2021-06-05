import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: '' });
  const notificationDuration = 5000;

  // Initialise blog list
  useEffect(() => {
    blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
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
      setUser(retrievedUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setTempNotification('Wrong credentials', 'error', notificationDuration);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    // <form onSubmit={addBlog}>
    <form>
      <input
        value="yep"
        // onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={notification.message} type={notification.type} />

      {user === null
        ? loginForm()
        : (
          <div>
            <p>{`${user.name} logged in`}</p>
            {blogForm()}
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
          </div>
        )}

    </div>
  );
};

export default App;
