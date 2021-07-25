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
  const [notification, setNotification] = useState({ message: '', type: '' });

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

  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button disabled={page === 'authors'} onClick={() => setPage('authors')}>authors</button>
        <button disabled={page === 'books'} onClick={() => setPage('books')}>books</button>
        {token
          ? (
            <>
              <button disabled={page === 'add'} onClick={() => setPage('add')}>add book</button>
              <button disabled={page === 'logout'} onClick={() => logout()}>logout</button>
            </>
          )
          : <button disabled={page === 'login'} onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify notification={notification} />

      <Authors
        show={page === 'authors'}
        authors={data.allAuthors}
      />

      {token
      && (
      <AuthorForm
        show={page === 'authors'}
        authors={data.allAuthors}
        setNotification={notify}
      />
      )}

      <Books
        show={page === 'books'}
        books={data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setNotification={notify}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setNotification={notify}
      />

    </div>
  );
};

export default App;
