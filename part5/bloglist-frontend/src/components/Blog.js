import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => (
  <div className="pb-m">
    <p>{`${blog.title}, ${blog.author}`}</p>
    <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
  </div>
);

Blog.propTypes = {
  // eslint-disable-next-line
  blog: PropTypes.object.isRequired,
  // title: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
};

export default Blog;
