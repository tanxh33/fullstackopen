import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // With Redux, we can shift the event handler for this component
  // away from the parent <App /> and into this child component.
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    event.target.anecdote.value = '';
    if (content !== '') {
      dispatch(createAnecdote(content));
    }
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm;
