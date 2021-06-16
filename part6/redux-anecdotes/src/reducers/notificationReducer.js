const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (notification, duration) => async (dispatch) => {
  dispatch({ type: 'SET_NOTIFICATION', notification });
  setTimeout(() => {
    dispatch({ type: 'RESET_NOTIFICATION' });
  }, duration);
};

export default notificationReducer;
