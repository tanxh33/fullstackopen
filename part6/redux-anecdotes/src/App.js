import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
