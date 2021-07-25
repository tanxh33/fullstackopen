import React, { useState } from 'react';
import Book from './Book';
import FilterButton from './FilterButton';

const Books = ({ show, books }) => {
  // Get a unique list of genres using a Set
  let genres = new Set([]);
  books.forEach((b) => {
    b.genres.forEach((g) => genres.add(g));
  });
  genres = [...genres].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const [filter, setFilter] = useState(null);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <span>genres: </span>
      <FilterButton content="all genres" disabled={!filter} onClick={() => setFilter(null)} />
      {genres.map((g) => (
        <FilterButton content={g} disabled={g === filter} onClick={() => setFilter(g)} key={g} />
      ))}

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
            <Book
              show={!filter || b.genres.includes(filter)}
              book={b}
              key={b.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
