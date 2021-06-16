import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { voteOn } from '../reducers/anecdoteReducer';
import { resetNotification, setNotification } from '../reducers/notificationReducer';

const sortByVotesDesc = (a, b) => b.votes - a.votes;

const Anecdote = ({ content, votes, vote }) => (
  <div>
    <div>
      {content}
    </div>
    <div>
      {`has ${votes} votes `}
      <button onClick={vote} type="button">Vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  // Access Redux store's state through useSelector, with optional filters
  const anecdoteList = useSelector(({ anecdotes, filter }) => { // destructured state
    const sortedAnecdotes = anecdotes.sort(sortByVotesDesc);
    if (filter) {
      return sortedAnecdotes.filter((a) => a.content.toUpperCase().includes(filter.toUpperCase()));
    }
    return anecdotes.sort(sortByVotesDesc);
  });
  const dispatch = useDispatch(); // Redux store's dispatch function

  const vote = (id) => {
    // console.log('vote', id);
    const anecdote = anecdoteList.find((a) => a.id === id);
    dispatch(voteOn(id, anecdote)); // Action creators defined in and imported from reducer file
    dispatch(setNotification(`You voted for "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  return (
    anecdoteList.map((anecdote) => (
      <Anecdote
        key={anecdote.id}
        content={anecdote.content}
        votes={anecdote.votes}
        vote={() => vote(anecdote.id)}
      />
    ))
  );
};

Anecdote.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired,
};

export default AnecdoteList;
