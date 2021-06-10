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
    <div>
      <h2 className="pb-s">Create new blog entry</h2>

      <form onSubmit={addBlog}>
        <div className="pb-s">
          title:
          <input
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div className="pb-s">
          author:
          <input
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div className="pb-s">
          url:
          <input
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
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
