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
jest.mock('../../../lib/AppSession');
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
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_LOGIN_FORM,
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,

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
  it('should set clearLoginForm', () => {
    expect(CLEAR_LOGIN_FORM).toBeDefined();
    expect(actions.clearLoginForm()).toEqual({ type: CLEAR_LOGIN_FORM });
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
  it('should set logoutRequest', () => {
    expect(LOGOUT_REQUEST).toBeDefined();
    expect(actions.logoutRequest()).toEqual({ type: LOGOUT_REQUEST });
  });
  it('should set logoutSuccess', () => {
    expect(LOGOUT_SUCCESS).toBeDefined();
    expect(actions.logoutSuccess()).toEqual({ type: LOGOUT_SUCCESS });
  });
  it('should set logoutFailure', () => {
    expect(LOGOUT_FAILURE).toBeDefined();
    let error = { error: 'test error' };
    expect(actions.logoutFailure(error))
      .toEqual({ type:LOGOUT_FAILURE, payload: error});
  });

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
      {type: CLEAR_LOGIN_FORM},
      {type: LOGIN_SUCCESS}
    ];

    const store = mockStore({}, expectedActions);
    return store.dispatch(actions.login('foo','bar'));
  });

  pit('should logout', () => {
    const expectedActions = [
      {type: LOGOUT_REQUEST},
      {type: LOGOUT_SUCCESS}
    ];

    const store = mockStore({}, expectedActions);
    return store.dispatch(actions.logout());
  });

  it('should set sessionRequest', () => {
    expect(SESSION_REQUEST).toBeDefined();
    expect(actions.sessionRequest()).toEqual({ type: SESSION_REQUEST });
  });
  it('should set sessionRequestSuccess', () => {
    expect(SESSION_SUCCESS).toBeDefined();
    let token = { token: 'thisisthetoken' };
    expect(actions.sessionRequestSuccess(token))
      .toEqual({ type: SESSION_SUCCESS, payload: token });
  });
  it('should set sessionRequestFailure', () => {
    let error = { error: 'thisistheerror' };
    expect(actions.sessionRequestFailure(error))
      .toEqual({ type: SESSION_FAILURE, payload: error });
  });

  pit('should getSession', () => {
    expect(SESSION_REQUEST).toBeDefined();
    expect(SESSION_SUCCESS).toBeDefined();
    const expectedActions = [
      {type: SESSION_REQUEST},
      {type: CLEAR_LOGIN_FORM},
      {type: SESSION_SUCCESS}
    ];

    const store = mockStore({}, expectedActions);
    return store.dispatch(actions.getSession());
  });
});
