import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const Logo = () => (
  <h1>
    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
      blogs!
    </Link>
  </h1>
);

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const navbarStyle = {
    background: '#c7ef77',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
  };
  const rightAlign = {
    marginLeft: 'auto',
  };

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(setNotification('Logout successful', 'success'));
    history.push('/');
  };

  return (
    user
      ? (
        <div style={navbarStyle}>
          <Logo />
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          <span style={rightAlign}>{`Logged in as ${user.name}`}</span>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      )
      : (
        <div style={navbarStyle}>
          <Logo />
        </div>
      )
  );
};

export default Navbar;
