// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import history from 'utils/history';
import { take, call, put, fork, race } from 'redux-saga/effects';
import auth from '../../utils/api/auth';

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  PASSWORD_RESET_REQUEST,
  SENT_RESET_PASSWORD_TOKEN,
  CONFIRM_DIGIT_CODE,
  VALIDATE_PHONE_CODE,
  VALIDATE_RESET_PASSWORD,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  REQUEST_ERROR,
  SET_NEW_PASSWORD
} from '../../constants/actionTypes';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 */
export function* authorize({ email, password, isRegistering }) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, email, password);
    } else {
      response = yield call(auth.login, email, password);
    }

    if (response.success) {
      yield put({ type: SET_AUTH, newAuthState: response.data }); // User is logged in (authorized)
      return response.data;
    }
    yield put({ type: REQUEST_ERROR, error: error.message });
    return false;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.error.message });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  // eslint-disable-line consistent-return
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout);
    yield put({ type: SENDING_REQUEST, sending: false });

    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(LOGIN_REQUEST);
    const { email, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, { email, password, isRegistering: false }),
      logout: take(LOGOUT)
    });
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      forwardTo('/'); // Go to home page
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put({ type: SET_AUTH, newAuthState: {} }); // User is not logged in (not authorized)
      yield call(logout); // Call `logout` effect
      forwardTo('/login'); // Go to root page
    }
  }
}

export function* passwordResetRequestFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `PASSWORD_RESET_REQUEST` actions and destructuring its payload
    const request = yield take(PASSWORD_RESET_REQUEST);
    yield put({
      type: SENT_RESET_PASSWORD_TOKEN,
      sendingResetToken: true,
      tokenSent: false
    });

    const { username } = request.data;
    try {
      const response = yield call(auth.passwordResetRequest, username);

      if (response.success) {
        yield put({
          type: SENT_RESET_PASSWORD_TOKEN,
          sendingResetToken: false,
          tokenSent: true,
          resetTokenSentFailed: false,
          resetKey: response.data.reset_key,
          phoneLast4: response.data.phone_last_4
        });
        // Receive reset key
      } else {
        yield put({
          type: SENT_RESET_PASSWORD_TOKEN,
          sendingResetToken: false,
          tokenSent: false,
          resetTokenSentFailed: true,
          resetKey: null,
          phoneLast4: null
        });
      }
    } catch (error) {
      yield put({
        type: SENT_RESET_PASSWORD_TOKEN,
        sendingResetToken: false,
        tokenSent: false,
        resetTokenSentFailed: true,
        resetKey: null,
        phoneLast4: null
      });
    }

    // yield call(logout);
    // forwardTo('/login');
  }
}

export function* confirmPhoneCode() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `PASSWORD_RESET_REQUEST` actions and destructuring its payload
    const request = yield take(CONFIRM_DIGIT_CODE);

    const code = request.data;
    try {
      const response = yield call(auth.confirmPhoneCode, code);
      if (response.success) {
        yield put({ type: VALIDATE_PHONE_CODE, validatePhoneCode: true });
      } else {
        yield put({ type: VALIDATE_PHONE_CODE, validatePhoneCode: false });
      }
    } catch (error) {
      yield put({ type: VALIDATE_PHONE_CODE, validatePhoneCode: false });
    }

    // yield call(logout);
    // forwardTo('/login');
  }
}

export function* submitNewPassword() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `SET_NEW_PASSWORD` actions and destructuring its payload
    const request = yield take(SET_NEW_PASSWORD);

    const data = request.data;
    try {
      const response = yield call(auth.submitNewPassword, data.password);
      if (response.success) {
        yield put({ type: VALIDATE_RESET_PASSWORD, validateResetPassword: true });
      } else {
        yield put({ type: VALIDATE_RESET_PASSWORD, validateResetPassword: false });
      }
    } catch (error) {
      yield put({ type: VALIDATE_RESET_PASSWORD, validateResetPassword: false });
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  while (true) {
    // eslint-disable-line no-constant-condition
    yield take(LOGOUT);
    yield put({ type: SET_AUTH, newAuthState: {} });

    yield call(logout);
    forwardTo('/login');
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function* registerFlow() {
  while (true) {
    // eslint-disable-line no-constant-condition
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(REGISTER_REQUEST);
    const { username, password } = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorize, { username, password, isRegistering: true });

    // If we could register a user, we send the appropriate actions
    if (wasSuccessful) {
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized) after being registered

      yield put({ type: CHANGE_USERNAME, username: '' }); // Clear username

      yield put({ type: CHANGE_PASSWORD, password: '' }); // Clear password

      forwardTo('/home'); // Go to home page
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(registerFlow);
  yield fork(passwordResetRequestFlow);
  yield fork(confirmPhoneCode);
  yield fork(submitNewPassword);
}

// Little helper function to abstract going to different pages
function forwardTo(location) {
  history.push(location);
}
