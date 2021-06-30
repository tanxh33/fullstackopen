import React from 'react';

const UserList = ({ users }) => {
  const tableStyle = {
    textAlign: 'left',
    margin: '1rem 0',
  };

  return (
    <div>
      <h2>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><a href={`/users/${user.id}`}>{user.name}</a></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
