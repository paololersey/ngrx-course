import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';
import { AuthActions } from '../action.types';

export interface AuthState {
  user: User;

}
// define initial state
export const initialAuthState: AuthState = {
  user: undefined
};


export const authReducer = createReducer(
  initialAuthState,
  // on means: take the action following, in this case login action, and give a response
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  })
);


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
