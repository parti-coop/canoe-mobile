/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict';
/**
 * ## Import
 *
 * React
 */
const React = require('react-native');
const {
  PropTypes
} = React;

/**
 * States of login display
 */
const {
  LOGIN_STATE_LOGIN
} = require('../lib/constants').default;

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var LoginForm = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    form: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    let loginForm = t.struct({
      username: t.String,
      password: t.String
    });

    let username_field = {
      label: 'Username',
      editable: !this.props.form.isFetching,
    };

    let password_field = {
      label: 'Password',
      secureTextEntry: true,
      editable: !this.props.form.isFetching,
    };

    let options = {
      auto: 'placeholders',
      fields: {
        username: username_field,
        password: password_field
      }
    };

    return (
      <Form ref="form"
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />

    );
  }
});

module.exports = LoginForm;

