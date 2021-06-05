import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => (
  <div>
    {`${blog.title}, ${blog.author}`}
  </div>
);

Blog.propTypes = {
  // eslint-disable-next-line
  blog: PropTypes.object.isRequired,
  // title: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
};

export default Blog;
