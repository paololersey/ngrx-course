import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  // for time travelling debugger
  router: routerReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

// metareducer that logs
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before ' + state);
    console.log('action ' + action);
    return reducer(state, action);
  };
}
