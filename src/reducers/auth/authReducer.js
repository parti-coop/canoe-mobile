/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 */
const InitialState = require('./authInitialState').default;
const formValidation = require('./authFormValidation').default;

/**
 * Auth actions
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,
  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_LOGIN,
  LOGIN_FAILURE,
  ON_AUTH_FORM_FIELD_CHANGE
} = require('../../lib/constants').default;

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
const initialState = new InitialState;
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
  case SESSION_TOKEN_REQUEST:
    let nextState =  state
      .setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null);
    return nextState;
  case SESSION_TOKEN_SUCCESS:
  case SESSION_TOKEN_FAILURE:
    return state.setIn(['form', 'isFetching'], false);
  /**
   * ### Logout state
   * The user has successfully access Parse.com
   * Clear the form's error and all the fields
   */
  case LOGIN_STATE_LOGOUT:
    return formValidation(state
        .setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
        .setIn(['form', 'fields', 'username'], '')
        .setIn(['form', 'fields', 'password'], '')
    );
  /**
   * ### Loggin in state
   * The user isn't logged in, and needs to
   * login, register or reset password
   *
   * Set the form state and clear any errors
   */
  case LOGIN_STATE_LOGIN:
    return formValidation(
      state
        .setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
    );
  /**
   * ### Auth form field change
   *
   * Set the form's field with the value
   * Clear the forms error
   * Pass the fieldValidation results to the
   * the formValidation
   */
  case ON_AUTH_FORM_FIELD_CHANGE:
    const {field, value} = action.payload;
    return formValidation(
      state
        .setIn(['form', 'fields', field], value)
        .setIn(['form', 'error'], null)
    );
  /**
   * ### Access to CanoeApp denied or failed
   * The fetching is done, but save the error
   * for display to the user
   */
  case LOGIN_FAILURE:
    return state
      .setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload);
  }
  /**
   * ## Default
   */
  return state;
}
