import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  // <App /> is defined as a child of a Provider component, with an attribute "store".
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
