import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

// Action creators, so that <App /> does not need to handle action.type etc. anymore

// Returns an inner function which fetches all anecdotes,
// then dispatches them to the action, which adds them to the store.
export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  });
};

// Returns an inner function which creates a new anecdote,
// dispatches it to the action, and adds them to the store.
export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch({
    type: 'CREATE_ANECDOTE',
    data: newAnecdote,
  });
};

export const voteOn = (id, anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update(id, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  dispatch({
    type: 'VOTE',
    data: updatedAnecdote,
  });
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;

    case 'CREATE_ANECDOTE':
      return [...state, asObject(action.data.content)];

    case 'VOTE': {
      const updatedAnecdote = action.data;
      return state.map((anec) => (anec.id === updatedAnecdote.id ? updatedAnecdote : anec));
    }

    default:
      return state;
  }
};

export default anecdoteReducer;
