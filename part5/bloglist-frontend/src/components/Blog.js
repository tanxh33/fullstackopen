import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const blogStyle = {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
  };

  return (
    expanded
      ? (
        <div style={blogStyle}>
          <button onClick={toggleExpanded} type="button" className="mb-s">Hide</button>
          <br />
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
          <div>
            {`Likes: ${blog.likes} `}
            <button onClick={likeBlog} type="button">Like</button>
          </div>
          <p>{`${blog.user.name}`}</p>
          <button onClick={deleteBlog} type="button" className="error mt-s">Delete</button>
        </div>
      )
      : (
        <div style={blogStyle}>
          <button onClick={toggleExpanded} type="button" className="mb-s">View</button>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
        </div>
      )
  );
};

Blog.propTypes = {
  // eslint-disable-next-line
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
