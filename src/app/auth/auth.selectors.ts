import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';


// memorized function - a mapping function with memory.
/*export const isLoggedIn = createSelector(
  state => state['auth'],
  (auth) => !!auth.user
);*/
// Type-safe version of createSelector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedInBool => !loggedInBool
  );




