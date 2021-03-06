import React, { useState } from 'react';
import Book from './Book';
import FilterButton from './FilterButton';

const Books = ({ show, books }) => {
  // Get a unique list of genres using a Set
  let genres = new Set([]);
  books.forEach((b) => {
    b.genres.forEach((g) => genres.add(g));
  });
  // Sort genre list into alphabetical order
  genres = [...genres].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const [filter, setFilter] = useState(null);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <span>genres: </span>
      <FilterButton label="all genres" disabled={!filter} onClick={() => setFilter(null)} />
      {genres.map((g) => (
        <FilterButton label={g} disabled={g === filter} onClick={() => setFilter(g)} key={g} />
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
              // Show all books if filter is null, but if there is a genre,
              // we check if the book has that genre.
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
