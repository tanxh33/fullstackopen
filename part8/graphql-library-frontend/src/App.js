import React, { useState, useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_INFO } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import AuthorForm from './components/AuthorForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  // Use option { pollInterval: 2000 } to poll the query every 2s (simple but wasteful!)
  const result = useQuery(ALL_INFO);
  const { loading, data } = result;
  const client = useApolloClient();

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    const tokenInStorage = window.localStorage.getItem('library-user-token');
    if (tokenInStorage) {
      setToken(tokenInStorage);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    client.resetStore(); // Reset cache of Apollo client, accessed with useApolloClient hook
  };

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
        {token
          ? (
            <>
              <button type="button" onClick={() => setPage('add')}>add book</button>
              <button type="button" onClick={() => logout()}>logout</button>
            </>
          )
          : <button type="button" onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={data.allAuthors}
      />

      {token
      && (
      <AuthorForm
        show={page === 'authors'}
        authors={data.allAuthors}
        setError={notify}
      />
      )}

      <Books
        show={page === 'books'}
        books={data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={notify}
      />

    </div>
  );
};

export default App;
