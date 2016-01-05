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
import CONFIG from '../../lib/config';
const {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  CLEAR_LOGIN_FORM,

  ON_AUTH_FORM_FIELD_CHANGE
} = require('../../lib/constants').default;
const  _ = require('underscore');

/**
 * Project requirements
 */
const CanoeApp = require('../../lib/CanoeApp').default;
const AppSession = require('../../lib/AppSession').default;

export function clearLoginForm() {
  return {
    type: CLEAR_LOGIN_FORM
  };
}

/**
 * ## Logout actions
 */
export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return new  AppSession().delete()
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        dispatch(logoutFailure(error));
      });
  };
}

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
 * which is the currentUser which contains the session
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function login(username,  password) {
  return dispatch => {
    dispatch(loginRequest());
    return new CanoeApp().authenticate({
      username: username,
      password: password,
      client: CONFIG.CANOE_APP.CLIENT_ID,
      server: CONFIG.CANOE_APP.SERVER_ID
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        var json = JSON.parse(response._bodyInit);
        var token = json["token"]
        var email = json["email"]
        return new CanoeApp().authorize({
          email: email,
          token: token,
          client: CONFIG.CANOE_APP.CLIENT_ID
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            var session = JSON.parse(response._bodyInit);
            return saveSession(response, session)
          }
          return response;
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            var session = JSON.parse(response._bodyInit);
            dispatch(clearLoginForm());
            dispatch(loginSuccess(session));
          } else {
            dispatch(loginFailure(JSON.parse(response._bodyInit)));
          }
          return response;
        })
        .catch((error) => {
          dispatch(loginFailure(error));
        });
      }
      return response;
    })
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
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

export function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    payload: session
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}

/**
 * ## getSession
 * If AppSession has the session, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSession() {
  return dispatch => {
    dispatch(sessionRequest());
    return new AppSession().get()
      .then((session) => {
        if(session != null) {
          dispatch(clearLoginForm());
          dispatch(sessionRequestSuccess(session));
        } else {
          dispatch(clearLoginForm());
          dispatch(sessionRequestSuccess(false));
        }
      })
      .catch((error) => {
        dispatch(sessionRequestFailure(error));
      });
  };
}
/**
 * ## Session actions
 */
export function sessionRequest() {
  return {
    type: SESSION_REQUEST
  };
}
export function sessionRequestSuccess(session) {
  return {
    type: SESSION_SUCCESS,
    payload: session
  };
}
export function sessionRequestFailure(error) {
  return {
    type: SESSION_FAILURE,
    payload: _.isUndefined(error) ? null : error
  };
}

/**
 * ## saveSession
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - the currentUser from Parse.com w/ session
 */
export function saveSession(response, session) {
  return new AppSession().store(session)
    .then(() => {
      return response;
    });
}

