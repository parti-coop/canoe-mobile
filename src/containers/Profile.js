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
  View,
  Image
}
from 'react-native';
import CONFIG from '../lib/config';

/**
 * The actions
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * The components
 */
import FormButton from '../components/FormButton';

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sessionContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 100
  },
  logOutButtonContainer: {
    flex: 1,
  },
  nickname: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    textAlign: 'center',
  },
  image: {
    width: 53,
    height: 81,
  },
});


class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      value: {
        session: this.props.auth.session
      }
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      value: {
        session: this.props.auth.session
      }
    });
  }
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    let current_user = this.props.auth.session.user;
    return(
      <View style={styles.container}>
        <View style={styles.sessionContainer}>
          <Image
            source={{uri: CONFIG.SSO_APP.BASE_URL + '/users/images/' + current_user.nickname}}
            style={styles.image}
          />
          <View style={styles.byline}>
            <Text style={styles.email}>{current_user.email}</Text>
            <Text style={styles.nickname}>{current_user.nickname}</Text>
          </View>
        </View>
        <View style={styles.logOutButtonContainer}>
          {this._renderLogOutButton()}
        </View>
      </View>
    );
  }

  _renderLogOutButton() {
    let self = this;
    let onButtonPress = () => {
      this.props.actions.logout();
    };
    return (
      <FormButton
        buttonText={'Log out'}
        onPress={onButtonPress.bind(self)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
