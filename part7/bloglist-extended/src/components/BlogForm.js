import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

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
    } catch (exception) {
      dispatch(setNotification('Add blog failed', 'error'));
    }

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  return (
    <div className="blogFormDiv my-s">
      <h2 className="pb-s">Create new blog entry</h2>

      <form onSubmit={addBlog}>
        <div className="pb-s">
          <label htmlFor="input-blog-title">
            Title
            <input
              id="input-blog-title"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </label>
        </div>

        <div className="pb-s">
          <label htmlFor="input-blog-author">
            Author
            <input
              id="input-blog-author"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </label>
        </div>

        <div className="pb-s">
          <label htmlFor="input-blog-url">
            URL
            <input
              id="input-blog-url"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            />

          </label>
        </div>
        <button id="create-blog-button" type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
