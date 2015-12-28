/**
 * # Login.js
 *
 * This class is a little complicated as it handles states. It's also
 * a container so there is boilerplate from Redux similiar to ```App```.
 */
'use strict';

/**
 * ## Imports
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';
import React,
{
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';
/**
 * The actions
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * The components
 */
//import ErrorAlert from '../components/ErrorAlert';
import FormButton from '../components/FormButton';
import LoginForm from '../components/LoginForm';
//import ItemCheckbox from '../components/ItemCheckbox';

/**
 * The states were interested in
 */
const {
  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_LOGIN
} = require('../lib/constants').default;

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    //this.errorAlert = new ErrorAlert();
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        password: this.props.auth.form.fields.password
      }
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      value: {
        username: props.auth.form.fields.username,
        password: props.auth.form.fields.password
      }
    });
  }
  onChange(value) {
    if (value.username != '') {
      this.props.actions.onAuthFormFieldChange('username', value.username);
    }
    if (value.password != '') {
      this.props.actions.onAuthFormFieldChange('password', value.password);
    }
    this.setState(
      {value}
    );
  }
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return(
      <View style={styles.container}>
        <View>
          {this._renderLoginForm()}
          {this._renderLogInButton()}
        </View>
      </View>
    );
  }

  _renderLoginForm() {
    let self = this;
    switch(this.props.auth.form.state) {
    case(LOGIN_STATE_LOGIN):
      return(
        <View style={styles.inputs}>
          <LoginForm
            form={this.props.auth.form}
            value={this.state.value}
            onChange={self.onChange.bind(self)}
          />
        </View>
      );
    }//switch
  }
  _renderLogInButton() {
    switch(this.props.auth.form.state) {
    /**
     * Render the button for logging out and call the logout action
     */
    case(LOGIN_STATE_LOGOUT):
      return this._renderFormButton('Log out', () => {
        this.props.actions.logout();
      });
      break;
    /**
     * Render the button for logging in and call the login action
     */
    case(LOGIN_STATE_LOGIN):
      return this._renderFormButton('Log in', () => {
        this.props.actions.login(this.props.auth.form.fields.username, this.props.auth.form.fields.password);
      });
      break;
    }//switch
  }
  _renderFormButton(loginButtonText, onButtonPress) {
    let self = this;
    return (
      <FormButton
        isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
        onPress={onButtonPress.bind(self)}
        buttonText={loginButtonText}/>
    );
  }
}

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
];

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
