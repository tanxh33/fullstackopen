import React from 'react';
import Book from './Book';

const Recommendations = ({ show, books, favoriteGenre }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        {'books in your favorite genre: '}
        <strong>{favoriteGenre}</strong>
      </p>

      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <Book show={b.genres.includes(favoriteGenre)} book={b} key={b.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
