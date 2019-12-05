import * as fromErrors from './errors.reducer';

export interface AppState {
  errors: fromErrors.ErrorState;
}

export const reducers = {
  errors: fromErrors.reducer
};
