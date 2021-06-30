import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
