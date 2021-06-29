import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import blogReducer from '../reducers/blogReducer';
import userReducer from '../reducers/userReducer';
import notificationReducer from '../reducers/notificationReducer';
import BlogForm from './BlogForm';

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm />, { wrapper: Wrapper },
  );

  const inputTitle = component.container.querySelector('#input-blog-title');
  const inputAuthor = component.container.querySelector('#input-blog-author');
  const inputUrl = component.container.querySelector('#input-blog-url');
  const form = component.container.querySelector('form');

  fireEvent.change(inputTitle, { target: { value: 'testing of forms could be easier' } });
  fireEvent.change(inputAuthor, { target: { value: 'fullstackopen' } });
  fireEvent.change(inputUrl, { target: { value: 'https://fullstackopen.com/en' } });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier');
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing of forms could be easier',
    author: 'fullstackopen',
    url: 'https://fullstackopen.com/en',
  });

  component.debug();
});
