import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  // With Redux, we can shift the event handler for this component
  // away from the parent <App /> and into this child component.
  const addAnecdote = async (event) => {
    event.preventDefault();
    const inputEl = event.target.anecdote;
    const content = inputEl.value.trim();
    inputEl.value = '';

    if (content !== '') {
      props.createAnecdote(content);
      props.setNotification(`You added "${content}"`, 5000);
    }
  };

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">Create</button>
    </form>
  );
};

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
