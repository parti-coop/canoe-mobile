/**
 * # LoginForm-test.js
 */

'use strict';
jest.autoMockOff();

/**
 * ## Imports
 *
 * React is mocked in src/__mocks__/react-native.js
 */
const React = require('react-native');
const utils = require('react-addons-test-utils');

/**
 * ## Under test
 * class under test
 */
jest.dontMock('../LoginForm');
var LoginForm = require('../LoginForm');

/**
 * Included here, after dontMock so it's in all it's glory
 */
var t = require('tcomb-form-native');
let Form = t.form.Form;

/**
 * ## Test
 */
describe('LoginForm', () => {

  /**
   * ### renderLoginForm
   * render the component under test and return
   * @returns {Object} object with props, output and the renderer
   */
  function renderLoginForm(props) {
    const renderer = utils.createRenderer();
    renderer.render(<LoginForm {...props}/>);
    const output = renderer.getRenderOutput();

    return {
      props,
      output,
      renderer
    };
  }
  /**
   * ### getFields
   *
   * @returns {Object} fields
   */
  function getFields(output) {
    return output.props.options.fields;
  }
  /**
   * ### renderLoginForm
   * render the component under test and return
   * @returns {Object} object with props, output and the renderer
   */
  function getValues(output) {
    return output.props.value;
  }
  /**
   * ### checkLoginForm
   */
  function checkLoginForm(props) {
    const {output} = renderLoginForm(props);
    expect(output.type,Form);

    const fields = getFields(output);
    const values = getValues(output);

    expect(values.username).toEqual(props.value.username);
    expect(fields.username.editable).toEqual(!props.form.isFetching);

    expect(values.password).toEqual(props.value.password);
    expect(fields.password.editable).toEqual(!props.form.isFetching);
  }

  /**
   * ## Test Log in
   */
  describe('Log in', () => {
    /**
     * ### it should should be nice
     */
    it('should be nice', () => {
      let form = {
        isFetching: false,
      };

      let value = {
        username: '',
        password: ''
      };

      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });
    /**
     * ### it should display  errors and  values
     * change the props and call ```checkLoginForm``` to validate
     */
    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
      };

      let value = {
        username: 'username',
        password: 'password'
      };

      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });
    /**
     * ### it should not be editable if fetching
     * change the props and call ```checkLoginForm``` to validate
     */
    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
      };

      let value = {
        username: 'username',
        password: 'password'
      };

      let props = {
        form: form,
        value: value,
        onChange: () => {}
      };

      checkLoginForm(props);
    });
  });
});//describe LoginFormTest
