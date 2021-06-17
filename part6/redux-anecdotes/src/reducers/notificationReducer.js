const initialState = {
  message: '',
  timeoutId: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.message };
    case 'RESET_NOTIFICATION':
      return { ...state, message: '' };
    case 'RESET_TIMEOUT':
      clearTimeout(state.timeoutId);
      return { ...state, timeoutId: action.timeoutId };
    default:
      return state;
  }
};

export const setNotification = (message, duration) => async (dispatch) => {
  dispatch({ type: 'SET_NOTIFICATION', message });
  const timeoutId = setTimeout(() => {
    dispatch({ type: 'RESET_NOTIFICATION' });
  }, duration);
  dispatch({ type: 'RESET_TIMEOUT', timeoutId });
};

export default notificationReducer;
