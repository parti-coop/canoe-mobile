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
const { Record } = require('immutable');

/**
 * Auth actions
 */
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

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
const initialState = new InitialState;
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
  case LOGIN_REQUEST:
  case LOGOUT_REQUEST:
  case SESSION_REQUEST:
    return state
      .setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null);
  case LOGIN_SUCCESS:
  case SESSION_SUCCESS:
    return state
      .setIn(['form', 'isFetching'], false)
      .setIn(['session'], action.payload);
  case LOGOUT_SUCCESS:
    return state
      .setIn(['form', 'isFetching'], false)
      .setIn(['session'], false);
  case LOGIN_FAILURE:
  case LOGOUT_FAILURE:
  case SESSION_FAILURE:
    return state
      .setIn(['form', 'isFetching'], false)
      .setIn(['session'], null);
  /**
   * ### Logout state
   * The user has successfully access Parse.com
   * Clear the form's error and all the fields
   */
  case CLEAR_LOGIN_FORM:
    return formValidation(
      state
        .setIn(['form', 'error'], null)
        .setIn(['form', 'fields', 'username'], '')
        .setIn(['form', 'fields', 'password'], '')
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
  }
  /**
   * ## Default
   */
  return state;
}
