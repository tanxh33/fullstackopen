import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const ALL_INFO = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    author
    published
    id
  }
}
`;

const App = () => {
  const [page, setPage] = useState('authors');

  const result = useQuery(ALL_INFO);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        <button type="button" onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  );
};

export default App;
