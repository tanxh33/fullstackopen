import React from 'react';

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
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
