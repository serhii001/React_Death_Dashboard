import { fork } from 'redux-saga/effects';
import watchAuthListener from './auth';
import watchCandidatesListener from './candidates';

export default function* rootSaga(context = {}) {
  yield fork(watchAuthListener, context);
  yield fork(watchCandidatesListener, context);
}
