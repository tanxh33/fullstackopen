import React, { useState, useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { decode } from 'jsonwebtoken';
import { ALL_INFO } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import Notify from './components/Notify';
import AuthorForm from './components/AuthorForm';
import LoginForm from './components/LoginForm';
import FilterButton from './components/FilterButton';

const App = () => {
  const [token, setToken] = useState(null);
  const [userFavGenre, setUserFavGenre] = useState(null);
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Use option { pollInterval: 2000 } to poll the query every 2s (simple but wasteful!)
  const result = useQuery(ALL_INFO);
  const { loading, data } = result;
  const client = useApolloClient();

  // On load, check if there is a logged-in user from local storage
  useEffect(() => {
    try {
      const tokenInStorage = window.localStorage.getItem('library-user-token');
      if (tokenInStorage) {
        setToken(tokenInStorage);
        setUserFavGenre(decode(tokenInStorage).favoriteGenre);
      }
    } catch (error) {
      localStorage.removeItem('library-user-token');
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUserFavGenre(null);
    setPage('authors');
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
        <FilterButton label="authors" disabled={page === 'authors'} onClick={() => setPage('authors')} />
        <FilterButton label="books" disabled={page === 'books'} onClick={() => setPage('books')} />
        {token
          ? (
            <>
              <FilterButton label="add book" disabled={page === 'add'} onClick={() => setPage('add')} />
              <FilterButton label="recommend" disabled={page === 'recommend'} onClick={() => setPage('recommend')} />
              <FilterButton label="logout" disabled={page === 'logout'} onClick={() => logout()} />
            </>
          )
          : <FilterButton label="login" disabled={page === 'login'} onClick={() => setPage('login')} />}
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

      <Recommendations
        show={page === 'recommend'}
        books={data.allBooks}
        favoriteGenre={userFavGenre}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setUserFavGenre={setUserFavGenre}
        setNotification={notify}
      />

    </div>
  );
};

export default App;
