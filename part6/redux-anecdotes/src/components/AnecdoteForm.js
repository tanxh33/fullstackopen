import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // With Redux, we can shift the event handler for this component
  // away from the parent <App /> and into this child component.
  const addAnecdote = async (event) => {
    event.preventDefault();
    const inputEl = event.target.anecdote;
    const content = inputEl.value.trim();
    inputEl.value = '';

    if (content !== '') {
      dispatch(createAnecdote(content));
      dispatch(setNotification(`You added "${content}"`, 5000));
    }
  };

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">Create</button>
    </form>
  );
};

export default AnecdoteForm;
