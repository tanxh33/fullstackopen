import React, { Fragment, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotesIdx, setMostVotesIdx] = useState(0);

  const getNewAnecdote = () => {
    let newIdx = selected;
    while (newIdx === selected) {
      newIdx = Math.floor(Math.random() * (anecdotes.length - 1));
    }
    setSelected(newIdx);
  };

  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    if (newVotes[selected] > newVotes[mostVotesIdx]) {
      setMostVotesIdx(selected);
    }
  };

  return (
    <Fragment>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={addVote}>vote</button>
        <button onClick={getNewAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotesIdx]}</p>
        <p>has {votes[mostVotesIdx]} votes</p>
      </div>
    </Fragment>
  );
};

export default App;
