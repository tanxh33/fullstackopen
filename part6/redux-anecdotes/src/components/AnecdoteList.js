import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteOn } from '../reducers/anecdoteReducer';

const sortByVotesDesc = (a, b) => b.votes - a.votes;

const Anecdote = ({ content, votes, vote }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        {`has ${votes} votes `}
        <button onClick={vote}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // Access Redux store's state, with optional filters
  const anecdotes = useSelector(state => state.sort(sortByVotesDesc));
  const dispatch = useDispatch(); // Redux store's dispatch function

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteOn(id)); // Action creators defined in and imported from reducer file
  }

  return (
    anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        content={anecdote.content}
        votes={anecdote.votes}
        vote={() => vote(anecdote.id)}
      />
    )
  )
}

export default AnecdoteList;
