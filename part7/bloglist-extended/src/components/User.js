import React from 'react';
import { Link } from 'react-router-dom';
import { ListItems, ListItem } from '../Styled/Components';

const User = ({ user }) => {
  if (!user) {
    return (
      <div>
        <h3>This user doesn&apos;t exist...</h3>
      </div>
    );
  }

  return (
    <div>
      <h2 className="pb-s">{user.name}</h2>
      <h3>Added blogs</h3>
      <ListItems>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        ))}
      </ListItems>
    </div>
  );
};

export default User;
