import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <AnecdoteList />
    <h2>Create new</h2>
    <AnecdoteForm />
  </div>
);

export default App;
