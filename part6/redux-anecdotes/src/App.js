import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <h2>Create new</h2>
    <AnecdoteForm />
  </div>
);

export default App;
