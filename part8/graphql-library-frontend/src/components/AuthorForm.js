import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const AuthorForm = ({ show, authors, setError }) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    if (name.trim() && birthyear.trim()) {
      const birthyearInt = parseInt(birthyear, 10);
      // Cache updates automatically because uses ID
      editAuthor({ variables: { name, setBornTo: birthyearInt } });
    } else {
      setError('Fields cannot be empty!');
      return;
    }

    setName('');
    setBirthyear('');
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found.');
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">{' '}</option>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
