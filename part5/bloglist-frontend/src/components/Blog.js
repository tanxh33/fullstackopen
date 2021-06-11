import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog }) => {
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
          <div>
            {`Likes: ${blog.likes} `}
            <button onClick={likeBlog} type="button">Like</button>
          </div>
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
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
