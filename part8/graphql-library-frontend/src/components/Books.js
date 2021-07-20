import React from 'react';

const Books = ({ show, books }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
