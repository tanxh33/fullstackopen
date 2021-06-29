import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
