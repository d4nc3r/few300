import { Action, createReducer } from '@ngrx/store';

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  isAdmin: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  isAdmin: true
};

// ASK JEFF: isn't setting initial state here redundant because we're doing it in myReducer??
export function reducer(state: UserState = initialState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState
);
