import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../reducers/blogReducer';
import { logoutUser } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import {
  Button, Input, ListItems, ListItem,
} from '../Styled/Components';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const submitComment = async (id, content) => {
    if (content.trim() === '') {
      dispatch(setNotification('Comment must have content!', 'danger'));
      return;
    }

    try {
      await dispatch(addComment(id, content.trim()));
      setCommentText('');
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      if (errorMessage === 'token expired') {
        dispatch(setNotification('Your login has expired', 'danger'));
        dispatch(logoutUser());
      } else {
        dispatch(setNotification('Add comment failed', 'danger'));
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
      <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      <div>
        {'Likes: '}
        <span className="blog-likes">{blog.likes}</span>
        {' '}
        <Button onClick={likeBlog} type="button">Like</Button>
      </div>
      <p>
        {'Submitted by: '}
        <Link to={`/users/${blog.user.id}`}>
          {blog.user.name}
        </Link>
      </p>
      <Button onClick={deleteBlog} type="button" danger className="mt-s">Delete</Button>

      <br />
      <br />
      <hr />

      <div className="my-s">
        <h3 className="pb-xs">Comments</h3>
        <form onSubmit={(e) => { e.preventDefault(); submitComment(blog.id, commentText); }}>
          <Input
            id="comment"
            type="text"
            value={commentText}
            name="Comment"
            onChange={({ target }) => setCommentText(target.value)}
          />
          <Button id="login-button" type="submit">Add comment</Button>
        </form>
        <ListItems>
          {blog.comments.map((comment) => (
            <ListItem key={`${comment.id}`}>{comment.content}</ListItem>
          ))}
        </ListItems>
      </div>
    </div>
  );
};

export default Blog;
