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

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification,
});

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION',
});

export default notificationReducer;
