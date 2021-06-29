import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import { getBlogs, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // Initialise blog list on load
  useEffect(async () => {
    dispatch(getBlogs());
  }, []);

  // Passed into Blog component
  const likeBlogHandler = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    try {
      dispatch(likeBlog(id, blog));
    } catch (exception) {
      dispatch(setNotification('Like blog failed', 'error'));
    }
  };

  // Passed into Blog component
  const deleteBlogHandler = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(id));
        dispatch(setNotification('Blog deleted', 'success'));
      } catch (exception) {
        dispatch(setNotification('Delete blog failed', 'error'));
      }
    }
  };

  return (
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={() => likeBlogHandler(blog.id)}
        deleteBlog={() => deleteBlogHandler(blog.id)}
      />
    ))

  );
};

export default BlogList;
