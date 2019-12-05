import * as fromErrors from './errors.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  errors: fromErrors.ErrorState;
}

export const reducers = {
  errors: fromErrors.reducer
};

// Selectors
const selectErrorBranch = (state: AppState) => state.errors;

export const selectHasError = createSelector(
  selectErrorBranch,
  e => e.hasError
);

export const selectErrorMessage = createSelector(
  selectErrorBranch,
  e => e.errorMessage
);
