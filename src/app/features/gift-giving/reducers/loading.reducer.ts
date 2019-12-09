import { Action, createReducer, on, State } from '@ngrx/store';
import * as holidaysActions from '../actions/holidays.actions';
import * as recipientsActions from '../actions/receipients.actions';

export interface LoadingState {
  recipientsLoaded: boolean;
  holidaysLoaded: boolean;
}

const initialState: LoadingState = {
  recipientsLoaded: false,
  holidaysLoaded: false
};

export function reducer(state: LoadingState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(holidaysActions.loadHolidays, (state) => ({ ...state, holidaysLoaded: false })),
  on(holidaysActions.loadHolidaysSucceeded, (state) => ({ ...state, holidaysLoaded: true })),
  on(recipientsActions.loadRecipients, (state) => ({ ...state, recipientsLoaded: false })),
  on(recipientsActions.loadRecipientsSucceeded, (state) => ({ ...state, recipientsLoaded: true }))
);
