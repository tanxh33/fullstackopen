import React from 'react';

const Book = ({ show, book }) => {
  if (!show) {
    return null;
  }

  return (
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
      <td>{book.genres.map((g) => `${g} `)}</td>
    </tr>
  );
};

export default Book;
