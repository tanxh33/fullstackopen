import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_INFO } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  // Use option { pollInterval: 2000 } to poll the query every 2s (simple but wasteful!)
  const result = useQuery(ALL_INFO);
  const { loading, data } = result;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        <button type="button" onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  );
};

export default App;
