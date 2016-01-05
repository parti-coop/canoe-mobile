'use strict';
jest.autoMockOff();

/**
 * ## Auth actions
 */
const {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,

  CLEAR_LOGIN_FORM,
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
  describe('SESSION-REQUEST', () => {
    it('starts fetching', () => {
      const action = {
        type: SESSION_REQUEST
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(true);
      expect(next.form.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const session = {
        user: {
          id: 100,
          email: 'test@gmail.com',
          nickname: 'ok'
        },
        token: 'token'
      };
      const action = {
        type: SESSION_SUCCESS,
        payload: session
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
      expect(next.session).toBe(session);
    });

    it('finishes fetching on failure', () => {
      const action = {
        type: SESSION_FAILURE
      };
      let next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
    });
  });

  /**
   * ### Clear login form
   *
   */
  describe('CLEAR_LOGIN_FORM', () => {
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
     * #### clear login form
     */
    it('form is invalid after clearing fields', () => {
      const action = {
        type: CLEAR_LOGIN_FORM
      };
      let init = authReducer(initialState, action);
      let withFields = init
        .setIn(['form','fields','username'],'dummy')
        .setIn(['form','fields','password'],'foo')
      let next = authReducer(withFields, action);
      expect(next.form.isValid).toBe(false);
      expect(next.form.fields.username).toBe('');
      expect(next.form.fields.password).toBe('');
    });

  });

  /**
   * ### The user logs in
   *
   */
  describe('ON_AUTH_FORM_FIELD_CHANGE', () => {
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
      expect(initialState.form.isValid).toBe(false);
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
      let next = authReducer(userNameState,
                             passwordFieldChangeAction);

      expect(next.form.isValid).toBe(true);
    });
  });
});

