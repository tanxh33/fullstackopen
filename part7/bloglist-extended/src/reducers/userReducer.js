import userService from '../services/users';

export const getUsers = () => async (dispatch) => {
  const allUsers = await userService.getAll();
  dispatch({
    type: 'GET_USERS',
    data: allUsers,
  });
};

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
