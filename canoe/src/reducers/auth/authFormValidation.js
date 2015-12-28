/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## Imports
 * the actions being addressed
 */
const {
  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_LOGIN
} = require('../../lib/constants').default;

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {
  switch(state.form.state) {
  /**
   * ### Logout has no fields, so always valid
   */
  case LOGIN_STATE_LOGOUT:
    return state.setIn(['form', 'isValid'], true);
  /**
   * ### Login has 2 fields
   */
  case LOGIN_STATE_LOGIN:
    if (state.form.fields.username !== ''
        &&
        state.form.fields.password !== '') {
      return state.setIn(['form','isValid'], true);
    } else {
      return state.setIn(['form','isValid'], false);
    }
  }

  /**
   * Default, return the state
   */
  return state;
}
