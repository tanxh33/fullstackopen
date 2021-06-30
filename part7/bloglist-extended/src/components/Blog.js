import React from 'react';
// import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({
  blog, expanded, likeBlog, deleteBlog,
}) => {
  // const [expanded, setExpanded] = useState(expanded);

  // const toggleExpanded = (event) => {
  //   event.preventDefault();
  //   setExpanded(!expanded);
  // };

  const blogStyle = {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
  };

  if (!blog) {
    return (
      <div>
        <h3>
          This blog doesn&apos;t exist...
        </h3>
      </div>
    );
  }

  return (
    expanded
      ? (
        <div>
          {/* <button onClick={toggleExpanded} type="button" className="mb-s">Hide</button> */}
          <br />
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <Link to={blog.url} target="_blank" rel="noreferrer">{blog.url}</Link>
          <div>
            {'Likes: '}
            <span className="blog-likes">{blog.likes}</span>
            {' '}
            <button onClick={likeBlog} type="button">Like</button>
          </div>
          <p>{`${blog.user.name}`}</p>
          <button onClick={deleteBlog} type="button" className="error mt-s">Delete</button>
        </div>
      )
      : (
        <div style={blogStyle} className="blog">
          {/* <button onClick={toggleExpanded} type="button" className="mb-s">View</button> */}
          <p>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
          <p>{blog.author}</p>
        </div>
      )
  );
};

export default Blog;
