import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import {
  Nav, NavBrand, NavItems, NavItem, NavStatus, NavItemButton,
} from '../Styled/Nav';

const Logo = () => (
  <NavBrand to="/">
    blogs!
  </NavBrand>
);

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(setNotification('Logout successful', 'success'));
    history.push('/');
  };

  return (
    user
      ? (
        <Nav>
          <NavItems>
            <Logo />
            <NavItem to="/">Blogs</NavItem>
            <NavItem to="/users">Users</NavItem>
            <NavStatus push>{`Logged in as ${user.name}`}</NavStatus>
            <NavItemButton primary onClick={logout}>Logout</NavItemButton>
          </NavItems>
        </Nav>
      )
      : (
        <Nav>
          <Logo />
        </Nav>
      )
  );
};

export default Navbar;
