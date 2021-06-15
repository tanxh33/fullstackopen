const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

// The state variable needs to be immutable.
// The Redux reducer must be a pure function.
// So for example, instead of arr.push(x), use arr.concat(x), which returns a new array.

const counterReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1};
    case 'OK':
      return {...state, ok: state.ok + 1};
    case 'BAD':
      return {...state, bad: state.bad + 1};
    case 'ZERO':
      return initialState;
    default:
      return initialState;
  }
}

export default counterReducer;
