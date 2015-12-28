'use strict';
jest.autoMockOff();

/**
 * ## Auth actions
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_LOGIN,
  ON_AUTH_FORM_FIELD_CHANGE

} = require('../../../lib/constants').default;

/**
 * ## Class under test
 */
const authReducer = require('../authReducer').default;

/**
 * ## Tests
 *
 * authReducer
 */
describe('authReducer', () => {
  describe('SESSION-TOKEN-REQUEST', () => {
    it('starts fetching', () => {
      const action = {
        type: SESSION_TOKEN_REQUEST
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(true);
      expect(next.form.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: SESSION_TOKEN_SUCCESS
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
    });

    it('finishes fetching on failure', () => {
      const action = {
        type: SESSION_TOKEN_FAILURE
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
    });
  });

  /**
   * ### The user logs out
   *
   */
  describe('LOGIN_STATE_LOGOUT', () => {
    let initialState = null;
    /**
     * #### Get a valid state
     */
    beforeEach(() => {
      const action = {
        type: 'dummy'
      };
      initialState = authReducer(undefined, action);
    });

    /**
     * #### form is valid to logout
     *
     * Should have a valid form and in the Logged out state
     */
    it('form is valid to logout', () => {
      const action = {
        type: LOGIN_STATE_LOGOUT
      };
      let next = authReducer(initialState, action);

      expect(next.form.state).toBe(LOGIN_STATE_LOGOUT);
      expect(next.form.isValid).toBe(true);
    });

    /**
     * #### form is valid to logout even with form fields
     *
     * Even if the form were to have some data, once they log out that
     * form should be cleared, valid and in the Logged out state
     *
     */
    it('form is valid to logout even with form fields', () => {
      const action = {
        type: LOGIN_STATE_LOGOUT
      };
      let init = authReducer(initialState, action);
      let withFields = init
        .setIn(['form','fields','username'],'dummy')
        .setIn(['form','fields','password'],'foo')
      let next = authReducer(withFields, action);
      expect(next.form.state).toBe(LOGIN_STATE_LOGOUT);
      expect(next.form.isValid).toBe(true);
      expect(next.form.fields.username).toBe('');
      expect(next.form.fields.password).toBe('');
    });

  });

  /**
   * ### The user logs in
   *
   */
  describe('LOGIN_STATE_LOGIN', () => {
    let initialState = null;
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy'
      };
      initialState = authReducer(undefined, action);
    });
    /**
     * #### form is not valid with empty fields
     *
     * empty fields are not allowed
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: LOGIN_STATE_LOGIN
      };
      let next = authReducer(initialState, action);

      expect(next.form.state).toBe(LOGIN_STATE_LOGIN);
      expect(next.form.isValid).toBe(false);
    });
    /**
     * #### form is  valid with valid fields
     *
     * provide valid input and the form should be valid
     */
    it('form is valid with valid fields', () => {

      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'dali'}
      };
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'dali!!'}
      };

      let userNameState = authReducer(initialState,
                                      userNameFieldChangeAction);
      let passwordState = authReducer(userNameState,
                                      passwordFieldChangeAction);

      const action = {
        type: LOGIN_STATE_LOGIN
      };

      let next = authReducer(passwordState, action);
      expect(next.form.state).toBe(LOGIN_STATE_LOGIN);
      expect(next.form.isValid).toBe(true);
    });
  });//LOGIN_STATE_LOGIN
});

