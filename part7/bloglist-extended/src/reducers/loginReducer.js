import loginService from '../services/login';
import blogService from '../services/blogs';

export const checkForLogin = () => async (dispatch) => {
  const userData = window.localStorage.getItem('loggedBloglistUser');
  if (userData) {
    const loggedUser = JSON.parse(userData);
    blogService.setToken(loggedUser.token);
    dispatch({
      type: 'LOGIN_USER',
      payload: loggedUser,
    });
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  // Send a POST request to API login
  const retrievedUser = await loginService.login({ username, password });

  window.localStorage.setItem('loggedBloglistUser', JSON.stringify(retrievedUser));
  blogService.setToken(retrievedUser.token);
  dispatch({
    type: 'LOGIN_USER',
    payload: retrievedUser,
  });
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('loggedBloglistUser');
  dispatch({ type: 'LOGOUT_USER' });
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export default loginReducer;
