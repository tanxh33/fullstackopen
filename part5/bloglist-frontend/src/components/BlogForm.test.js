import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} />,
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
});
