import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: 'From the Red Line',
      author: 'yuuka',
      url: 'https://medium.com/from-the-red-line',
      likes: 2,
      user: {
        id: '1236478123648712364781236487',
        username: 'yuuka',
        name: 'AYAYA',
      },
    };
  });

  test('Blog component should render unexpanded content', () => {
    const component = render(
      <Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} />,
    );

    // Container property contains all the expected HTML rendered by the component.
    expect(component.container).toHaveTextContent('From the Red Line');
    expect(component.container).toHaveTextContent('yuuka');
    expect(component.container).not.toHaveTextContent('https://medium.com/from-the-red-line');
    expect(component.container).not.toHaveTextContent('Likes');

    // Method 2 for searching for content in a component
    const element = component.getByText('From the Red Line');
    expect(element).toBeDefined();

    // Method 3
    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent('From the Red Line');

    // Prints the generated component's HTML to console.
    component.debug();
  });

  test('should render expanded content after button click calls event handler once', () => {
    const component = render(
      <Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} />,
    );

    // Click the button to expand the component
    const button = component.getByText('View');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('From the Red Line');
    expect(component.container).toHaveTextContent('yuuka');
    expect(component.container).toHaveTextContent('https://medium.com/from-the-red-line');
    expect(component.container).toHaveTextContent('Likes: 2');
    expect(component.container).toHaveTextContent('AYAYA');

    component.debug();
  });

  test('clicking like button twice should call event handler twice', () => {
    // Create a mock function to pass into the component
    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} likeBlog={mockHandler} deleteBlog={() => {}} />,
    );

    const expandButton = component.getByText('View');
    fireEvent.click(expandButton);

    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
