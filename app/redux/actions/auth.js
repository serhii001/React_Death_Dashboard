/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_AGAIN,
  RETRY_PASSWORD_REQUEST,
  CONFIRM_DIGIT_CODE,
  UPDATE_PHONE_CODE_VALID,
  SET_NEW_PASSWORD,
  ACCEPT_NEW_PASSWORD,
  REGISTER_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR
} from '../../constants/actionTypes';


/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  };
}

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return {
    type: SET_AUTH,
    newAuthState
  };
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest(sending) {
  return {
    type: SENDING_REQUEST,
    sending
  };
}

export function retryPasswordRequest(data) {
  return {
    type: RETRY_PASSWORD_REQUEST,
    data
  };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data
  };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 */
export function passwordResetRequest(data) {
  return {
    type: PASSWORD_RESET_REQUEST,
    data
  };
}

export function passwordResetAgain(data) {
  return {
    type: PASSWORD_RESET_AGAIN,
    data
  };
}

export function confirmPhoneCode(data) {
  return {
    type: CONFIRM_DIGIT_CODE,
    data
  };
}

export function updatePhoneCodeValid(data) {
  return {
    type: UPDATE_PHONE_CODE_VALID,
    data
  };
}

export function passwordReset(data) {
  return {
    type: SET_NEW_PASSWORD,
    data
  };
}

export function acceptNewPassword(data) {
  return { type: ACCEPT_NEW_PASSWORD, data };
}
/**
 * Tells the app we want to log out a user
 */
export function logout() {
  return {
    type: LOGOUT
  };
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data
  };
}

/*
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error
  };
}

/**
 * Sets the `error` state as empty
 */
export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
