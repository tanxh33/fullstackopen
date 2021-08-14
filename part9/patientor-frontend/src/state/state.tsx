import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

// Global state is shared here.
// Only one key in the state object 'patients'

export type State = {
  // Explicitly declare that the value could be undefined to account for
  // state.patients['non-existing-id']
  patients: { [id: string]: Patient | undefined };
  selectedPatient: Patient | null;
  // Alternatively:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  // patients: Map<string, Patient>;
};

const initialState: State = {
  patients: {},
  selectedPatient: null,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  // useReducer hook used to create the state and dispatch function.
  // This is made available globally by the setup in /index.tsx
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Components that need the state or dispatcher use this
// hook to access them
export const useStateValue = () => useContext(StateContext);
