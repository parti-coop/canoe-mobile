/**
 * # app.js
 *  **Note** a lot of this is boilerplate which is also in Login &
 *  Profile
 *
 *  After setting up the Redux actions, props and dispatch, this
 * class ```renders``` either the ```Login``` or ```Tabbar```
 */
'use strict';

/*
 * ## Imports
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';
import React, {
  Text,
  View,
  StyleSheet
} from 'react-native';

/**
 * Project imports
 */
const Login = require('./Login').default;
const Profile = require('./Profile').default;

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions';
import * as deviceActions from '../reducers/device/deviceActions';

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

/**
 * ## App class
 */
let App = React.createClass({
  /**
   * The initial state will be logged out
   */
  getInitialState: function() {
    return {
      loggedIn: null
    };
  },
  componentWillReceiveProps: function(props) {
    if(props.auth.session !== null) {
      this.setState ({
        loggedIn: (props.auth.session !== false)
      });
    }
  },
  componentDidMount: function() {
    this.props.actions.getSession();
  },
  render: function() {
    if (this.state.loggedIn == null) {
      return this.renderLoadingView();
    }

    return (this.state.loggedIn ? <Profile/> : <Login/>);
  },
  renderLoadingView: function() {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          Loading ...
        </Text>
      </View>
    );
  },
});

/**
 * ## Redux boilerplate
 */
const actions = [
  deviceActions,
  authActions
];

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
      ...state
  };
};

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
