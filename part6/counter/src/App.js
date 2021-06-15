import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

// Action -> Dispatcher -> Store -> View

// JS object in the store stores the entire state of the application.
// State of the store is changed with actions, which contain at least "type" property declared.
// A reducer function receives the current state and an action, and returns a new state.

const counterReducer = (state=0, action) => {
  // Defined a default state value of 0 so that the reducer works even if
  // the store has not been primed yet.
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
}

// Reducer is passed to createStore as a parameter.
const store = createStore(counterReducer);

// store.getState() method returns the current state of the store.
// store.dispatch({ type: 'INCREMENT' }) to change state using actions implemented in reducer.
// store.subscribe() creates callback functions which are called when state is changed.

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
})

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>0</button>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>+1</button>
    </div>
  );
}

// When the state in the store is changed, React does not auto re-render.
// Use store.subscribe() to listen for changes and call renderApp().
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp(); // initial call
store.subscribe(renderApp);

export default App;
