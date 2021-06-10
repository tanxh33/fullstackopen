import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
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
          <p>{`${blog.title}, ${blog.author}`}</p>
          <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
          <p>{`Likes: ${blog.likes}`}</p>
          <p>{`${blog.user.name}`}</p>
          <br />
          <button onClick={toggleExpanded} type="button">Hide</button>
        </div>
      )
      : (
        <div style={blogStyle}>
          <p>{`${blog.title}, ${blog.author}`}</p>
          <br />
          <button onClick={toggleExpanded} type="button">View</button>
        </div>
      )
  );
};

Blog.propTypes = {
  // eslint-disable-next-line
  blog: PropTypes.object.isRequired,
  // title: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
};

export default Blog;
