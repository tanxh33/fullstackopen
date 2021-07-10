import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_INFO } from '../queries';

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Define the mutation function
  // (set to update cache afterwards, but this doesn't update for other users)
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_INFO }],
    onError: (error) => {
      console.log(error);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log('Add book...');

    if (title.trim() && author.trim() && published.trim()) {
      const publishedInt = parseInt(published, 10);
      createBook({
        variables: {
          title, author, published: publishedInt, genres,
        },
      });
    } else {
      setError('Fields cannot be empty!');
      return;
    }

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres:
          {' '}
          {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
