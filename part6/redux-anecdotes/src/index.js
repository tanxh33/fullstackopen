import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import reducer from './reducers/anecdoteReducer';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  // <App /> is defined as a child of a Provider component, with an attribute "store".
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
