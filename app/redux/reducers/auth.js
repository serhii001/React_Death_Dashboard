import {
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SENT_RESET_PASSWORD_TOKEN,
  PASSWORD_RESET_AGAIN,
  RETRY_PASSWORD_REQUEST,
  VALIDATE_PHONE_CODE,
  VALIDATE_RESET_PASSWORD,
  ACCEPT_NEW_PASSWORD,
  UPDATE_PHONE_CODE_VALID
} from '../../constants/actionTypes';

export const authInitialState = {
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
  resetTokenSentFailed: false,
  verifyTokenSent: false,
  resetKey: null,
  phoneLast4: null,
  validatePhoneCode: false,
  phoneCodeValid: true,
  validateResetPassword: false
};

export function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.newAuthState };

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };

    case REQUEST_ERROR:
      return { ...state, loginError: action.error };

    case CLEAR_ERROR:
      return { ...state, loginError: '' };

    case SENT_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        currentlySendingResetToken: action.sendingResetToken,
        verifyTokenSent: action.tokenSent,
        resetTokenSentFailed: action.resetTokenSentFailed,
        resetKey: action.resetKey,
        phoneLast4: action.phoneLast4
      };

    case RETRY_PASSWORD_REQUEST:
      return {
        ...state,
        resetTokenSentFailed: false
      };

    case PASSWORD_RESET_AGAIN:
      return {
        ...state,
        verifyTokenSent: false
      };

    case VALIDATE_PHONE_CODE:
      return {
        ...state,
        validatePhoneCode: action.validatePhoneCode,
        phoneCodeValid: action.validatePhoneCode
      };

    case VALIDATE_RESET_PASSWORD:
      return {
        ...state,
        validateResetPassword: action.validateResetPassword
      };

    case UPDATE_PHONE_CODE_VALID:
      return {
        ...state,
        phoneCodeValid: true
      };

    case ACCEPT_NEW_PASSWORD:
      return {
        ...state,
        validateResetPassword: false
      };
    default:
      return state;
  }
}
