import axios from 'axios';
// import queryString from 'query-string';
import { API_ENDPOINT_URL } from '../../constants/defaults';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

/**
 * Logs a user in, returning a promise with `true` when done
 * @param  {string} email The username of the user
 * @param  {string} password The password of the user
 */
const login = (email, password) => {
  if (loggedIn()) return Promise.resolve({ success: true, data: getUserData() });
  return axios
    .post(`${API_ENDPOINT_URL}/auth/login`, {
      // email: email,
      username: email,
      password: password
    })
    .then(res => {
      if (res.data.user.token) {
        setUserData(res.data.user);
        return Promise.resolve({ success: true, data: res.data.user });
      }
      return Promise.resolve({ success: false, reason: res.data.message });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response.data });
    });
};

/**
 * Logs the current user out
 */
const logout = () => {
  const { token } = getUserData();
  return axios
    .post(
      `${API_ENDPOINT_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      clearUserData();
      Promise.resolve({ success: true });
    })
    .catch(err => {
      clearUserData();
      Promise.resolve({ success: false, reason: err.response.data.message || err.message });
    });
};

/**
 * Send Reset Password Request
 */
const passwordResetRequest = user => {
  return axios
    .post(`${API_ENDPOINT_URL}/auth/password-reset`, { query: user })
    .then(res => {
      if (res.data.success) {
        setResetToken(res.data.reset_key, res.data.phone_last_4);
        return Promise.resolve({ success: true, data: res.data });
      }
      return Promise.resolve({ success: false, reason: res.data.message });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err });
    });
};

/**
 * Send Phone Code Request
 */
const confirmPhoneCode = code => {
  console.log(code);
  return axios
    .put(`${API_ENDPOINT_URL}/auth/password-reset/` + localStorage.getItem('resetKey'), {
      code: code
    })
    .then(res => {
      if (res.data.success) {
        return Promise.resolve({ success: true, reason: res.data.message });
      }
      return Promise.resolve({ success: false, reason: res.data.message });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response.data });
    });
};

/**
 * Send New Password Request
 */
const submitNewPassword = password => {
  console.log(password);
  return axios
    .post(`${API_ENDPOINT_URL}/auth/password-reset/` + localStorage.getItem('resetKey'), {
      password: password
    })
    .then(res => {
      if (res.data.success) {
        return Promise.resolve({ success: true, reason: res.data.message });
      }
      return Promise.resolve({ success: false, reason: res.data.message });
    })
    .catch(err => {
      return Promise.reject({ success: false, error: err.response.data });
    });
};

/**
 * Checks if a user is logged in
 */
const loggedIn = () => {
  const { token } = getUserData();
  return !!token;
};

const getUserData = () => {
  try {
    const ret = {
      first_name: localStorage.getItem('firstName'),
      last_name: localStorage.getItem('lastName'),
      title: localStorage.getItem('Role'),
      last_4_of_phone: localStorage.getItem('last4_Phone'),
      require_2fa: localStorage.getItem('require2fa'),
      token: localStorage.getItem('userToken')
    };
    return ret;
  } catch (error) {
    return {};
  }
};

const setUserData = ({ first_name, last_name, title, last_4_of_phone, require_2fa, token }) => {
  try {
    localStorage.setItem('firstName', first_name);
    localStorage.setItem('lastName', last_name);
    localStorage.setItem('Role', title);
    localStorage.setItem('last4_Phone', last_4_of_phone);
    localStorage.setItem('require2fa', require_2fa);
    localStorage.setItem('userToken', token);
    return true;
  } catch (error) {
    return false;
  }
};

const setResetToken = (reset_key, phone_last_4) => {
  try {
    localStorage.setItem('resetKey', reset_key);
    localStorage.setItem('phoneLast4', phone_last_4);
    return true;
  } catch (error) {
    return false;
  }
};

const getResetToken = (reset_key, phone_last_4) => {
  try {
    const data = {
      resetKey: localStorage.getItem('resetKey', reset_key),
      phoneLast4: phonelocalStorage.getItem('phoneLast4', phone_last_4)
    };
    return data;
  } catch (error) {
    return {};
  }
};

const clearUserData = () => {
  try {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('Role');
    localStorage.removeItem('last4_Phone');
    localStorage.removeItem('require2fa');
    localStorage.removeItem('userToken');
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Registers a user and then logs them in
 * @param  {string} email The username of the user
 * @param  {string} password The password of the user
 */
const register = (email, password) => {
  // Post a fake request
  return {};
};

export default {
  login,
  logout,
  register,
  loggedIn,
  passwordResetRequest,
  confirmPhoneCode,
  submitNewPassword,
  getResetToken,
  getUserData,
  setUserData,
  clearUserData
};
