/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
 'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_STATE_LOGIN,
  LOGIN_STATE_LOGOUT,
  ON_AUTH_FORM_FIELD_CHANGE
} = require('../../lib/constants').default;

/**
 * Project requirements
 */
const CanoeApp = require('../../lib/CanoeApp').default;
const AppAuthToken = require('../../lib/AppAuthToken').default;

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout
 */
export function logoutState() {
  return {
    type: LOGIN_STATE_LOGOUT
  };
}

export function loginState() {
  return {
    type: LOGIN_STATE_LOGIN
  };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  };
}
/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field,value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Parse, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function login(username,  password) {
  return dispatch => {
    dispatch(loginRequest());
    return new CanoeApp().login({
      username: username,
      password: password
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        var json = JSON.parse(response._bodyInit);
        return saveSessionToken(response, json);
      }
      return response;
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        dispatch(logoutState());
        dispatch(loginSuccess());
      } else {
        dispatch(loginFailure(JSON.parse(response._bodyInit)));
      }
      return response;
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });

  };
}
/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - the currentUser from Parse.com w/ sessionToken
 */
export function saveSessionToken(response, json) {
  return new AppAuthToken().storeSessionToken(json)
    .then(() => {
      return response;
    });
}
