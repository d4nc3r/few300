import * as fromErrors from './errors.reducer';
import * as fromUser from './user.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  errors: fromErrors.ErrorState;
  user: fromUser.UserState;
}

export const reducers = {
  errors: fromErrors.reducer,
  user: fromUser.reducer
};

/****************
*   Selectors   *
****************/
const selectErrorBranch = (state: AppState) => state.errors;
const selectUserBranch = (state: AppState) => state.user;

export const selectHasError = createSelector(
  selectErrorBranch,
  e => e.hasError
);

export const selectErrorMessage = createSelector(
  selectErrorBranch,
  e => e.errorMessage
);

export const selectUserIsAdmin = createSelector(
  selectUserBranch,
  u => u.isAdmin
);
