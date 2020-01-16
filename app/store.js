/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { getAsyncInjectors } from './utils/asyncInjectors';
import root from './containers/App/sagas';
import auth from './utils/api/auth';

function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;

  store.asyncReducers = {}; // Async reducer registry

  const { injectSagas } = getAsyncInjectors(store);

  // Global sagas
  injectSagas([root]);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}

const initialState = {
  auth: {
      ...{
        first_name: null,
        last_name: null,
        title: null,
        last_4_of_phone: null,
        require_2fa: null,
        token: null,
        currentlySending: false,
        loggedIn: false,
        loginError: null,
        currentlySendingResetToken: false,
        verifyTokenSent: false,
        phoneLast4: null,
        resetKey: null
      },
      ...auth.getUserData()
    }
  },
};
const store = configureStore(initialState);

export default store;
