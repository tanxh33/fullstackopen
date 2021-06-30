import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../reducers/blogReducer';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const submitComment = async (id, content) => {
    if (content.trim() === '') {
      return;
    }

    try {
      await dispatch(addComment(id, content.trim()));
      setCommentText('');
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      if (errorMessage === 'token expired') {
        dispatch(setNotification('Your login has expired', 'error'));
        dispatch(logoutUser());
      } else {
        dispatch(setNotification('Add comment failed', 'error'));
      }
    }
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
    <div>
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
      <div style={{ margin: '1rem auto' }}>
        <h3 className="pb-xs">Comments</h3>
        <form onSubmit={(e) => { e.preventDefault(); submitComment(blog.id, commentText); }}>
          <input
            id="comment"
            type="text"
            value={commentText}
            name="Comment"
            onChange={({ target }) => setCommentText(target.value)}
          />
          <button id="login-button" type="submit">Add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={`${comment.id}`}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
