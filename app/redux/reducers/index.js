import { combineReducers } from 'redux';
import { authReducer, authInitialState } from './auth';
import { userReducer, userInitialState } from './users';
import { applicationReducer, applicationInitialState } from './candidate/application';
import { candidatesReducer, candidatesInitialState } from './candidates';

const appReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  application: applicationReducer,
  candidates: candidatesReducer
});

export function rootReducer(state, action) {
  return appReducer(state, action);
}

export const AppState = {
  auth: authInitialState,
  users: userInitialState,
  application: applicationInitialState,
  candidates: candidatesInitialState
};
