import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, likeBlogHandler, deleteBlogHandler }) => {
  if (!blogs) {
    return null;
  }

  return (
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        expanded={false}
        likeBlog={() => likeBlogHandler(blog.id)}
        deleteBlog={() => deleteBlogHandler(blog.id)}
      />
    ))
  );
};

export default BlogList;
