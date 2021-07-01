import React from 'react';
import { Link } from 'react-router-dom';
import { BlogListItems, BlogListItem } from '../Styled/BlogList';

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null;
  }

  return (
    <BlogListItems>
      {blogs.map((blog) => (
        <BlogListItem key={blog.id}>
          <p>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
          <p>{blog.author}</p>
        </BlogListItem>
      ))}
    </BlogListItems>
  );
};

export default BlogList;
