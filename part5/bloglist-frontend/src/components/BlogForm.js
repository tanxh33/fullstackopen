import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
