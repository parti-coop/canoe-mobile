/**
 * # authActions-test.js
 *
 * This test is for authActions
 *
 */
'use strict';
jest.autoMockOff();

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call Parse.com
 */
jest.mock('../../../lib/AppAuthToken');
jest.mock('../../../lib/CanoeApp');

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
var mockStore = require('../../mocks/Store').default;


/**
 * ## Class under test
 *
 */
var actions = require('../authActions');

/**
 * ## Imports
 *
 * actions under test
 */
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_LOGIN,

  ON_AUTH_FORM_FIELD_CHANGE
} = require('../../../lib/constants').default;
/**
 * ## Tests
 *
 * authActions
 */
describe('authActions', () => {
  /**
   * ### simple tests that prove the actions have the specific type
   */
  it('should set logoutState', () => {
    expect(LOGIN_STATE_LOGOUT).toBeDefined();
    expect(actions.logoutState()).toEqual({ type: LOGIN_STATE_LOGOUT });
  });
  it('should set loginState', () => {
    expect(LOGIN_STATE_LOGIN).toBeDefined();
    expect(actions.loginState()).toEqual({ type: LOGIN_STATE_LOGIN });
  });
  it('should set loginRequest', () => {
    expect(LOGIN_REQUEST).toBeDefined();
    expect(actions.loginRequest()).toEqual({ type: LOGIN_REQUEST });
  });
  it('should set loginSuccess', () => {
    expect(LOGIN_SUCCESS).toBeDefined();
    expect(actions.loginSuccess()).toEqual({ type: LOGIN_SUCCESS });
  });
  it('should set loginFailure', () => {
    expect(LOGIN_FAILURE).toBeDefined();
    let error = { error: 'thisistheerror' };
    expect(actions.loginFailure(error))
      .toEqual({ type: LOGIN_FAILURE, payload: error });
  });
  // it('should set logoutRequest', () => {
  //   expect(actions.logoutRequest()).toEqual({ type: LOGOUT_REQUEST });
  // });
  // it('should set logoutSuccess', () => {
  //   expect(actions.logoutSuccess()).toEqual({ type: LOGOUT_SUCCESS });
  // });
  // it('should set logoutFailure', () => {
  //   let error = { error: 'test error' };
  //   expect(actions.logoutFailure(error))
  //     .toEqual({ type:LOGOUT_FAILURE, payload: error});
  // });
  // it('should set sessionTokenRequest', () => {
  //   expect(actions.sessionTokenRequest()).toEqual({ type: SESSION_TOKEN_REQUEST });
  // });
  // it('should set sessionTokenRequestSuccess', () => {
  //   let token = { token: 'thisisthetoken' };
  //   expect(actions.sessionTokenRequestSuccess(token))
  //     .toEqual({ type: SESSION_TOKEN_SUCCESS, payload: token });
  // });
  // it('should set sessionTokenRequestFailure', () => {
  //   let error = { error: 'thisistheerror' };
  //   expect(actions.sessionTokenRequestFailure(error))
  //     .toEqual({ type: SESSION_TOKEN_FAILURE, payload: error });
  // });
  it('should set onAuthFormFieldChange', () => {
    expect(ON_AUTH_FORM_FIELD_CHANGE).toBeDefined();
    let field = 'field';
    let value = 'value';
    expect(actions.onAuthFormFieldChange(field, value))
      .toEqual({ type: ON_AUTH_FORM_FIELD_CHANGE, payload: { field: field, value: value }});
  });

  pit('should login', () => {
    const expectedActions = [
      {type: LOGIN_REQUEST},
      {type: LOGIN_STATE_LOGOUT},
      {type: LOGIN_SUCCESS}
    ];

    const store = mockStore({}, expectedActions);
    return store.dispatch(actions.login('foo','bar'));
  });
});
