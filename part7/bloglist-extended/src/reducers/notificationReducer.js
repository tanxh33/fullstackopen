const initialState = {
  message: '',
  style: '',
  timeoutId: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.message, style: action.style };
    case 'RESET_NOTIFICATION':
      return { ...state, message: '', style: '' };
    case 'RESET_TIMEOUT':
      clearTimeout(state.timeoutId);
      return { ...state, timeoutId: action.timeoutId };
    default:
      return state;
  }
};

export const setNotification = (message, style, duration = 5000) => async (dispatch) => {
  dispatch({ type: 'SET_NOTIFICATION', message, style });
  const timeoutId = setTimeout(() => {
    dispatch({ type: 'RESET_NOTIFICATION' });
  }, duration);
  dispatch({ type: 'RESET_TIMEOUT', timeoutId });
};

export default notificationReducer;
