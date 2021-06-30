import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  const blogStyle = {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
  };

  if (!blogs) {
    return null;
  }

  return (
    <ul style={{ listStyleType: 'none' }}>
      {blogs.map((blog) => (
        <li key={blog.id} style={blogStyle} className="blog">
          <p>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
          <p>{blog.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
