import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, Input, Label } from '../Styled/Components';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await dispatch(
        createBlog({
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl,
        }),
      );
      dispatch(setNotification(`Blog added: ${newBlog.title} by ${newBlog.author}`, 'success'));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      if (errorMessage === 'token expired') {
        dispatch(setNotification('Your login has expired', 'danger'));
        dispatch(logoutUser());
      } else if (errorMessage.includes('Blog validation failed')) {
        dispatch(setNotification('Title and URL are required fields', 'danger'));
      } else {
        dispatch(setNotification('Add blog failed', 'danger'));
      }
    }
  };

  return (
    <div>
      <h2 className="pb-s">Create new blog entry</h2>

      <form onSubmit={addBlog}>
        <Label htmlFor="input-blog-title">
          Title
          <Input
            id="input-blog-title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </Label>

        <Label htmlFor="input-blog-author">
          Author
          <Input
            id="input-blog-author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </Label>

        <Label htmlFor="input-blog-url">
          URL
          <Input
            id="input-blog-url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </Label>

        <Button primary id="create-blog-button" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
