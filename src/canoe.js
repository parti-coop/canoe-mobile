/**
 * # canoe
 */
'use strict';

/**
 * ## imports
 */
import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux/native';
import App from './containers/App';
import configureStore from './lib/configureStore';

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';

/**
 * ## States
 * There are initial states defined and together they make the Apps
 * initial state
 */
import deviceInitialState from './reducers/device/deviceInitialState';
import authInitialState from './reducers/auth/authInitialState';

/**
 *  The version of the app but not  displayed yet
 */
var VERSION='0.0.1';

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure
 * @returns {Object} object with keys
 */
function getInitialState() {
  const _initState = {
    device: (new deviceInitialState).set('isMobile', true).set('version', VERSION),
    auth: new authInitialState
  };
  return _initState;
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */
export default function native(platform) {
  let Canoe = React.createClass({
    render: function() {
      const store = configureStore(getInitialState());
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));

      return (
        <Provider store={store}>
          {() => <App store={store}/>}
        </Provider>
      );
    }
  });

  /**
   * registerComponent to the AppRegistry and off we go....
   */
  AppRegistry.registerComponent('canoe', () => Canoe);
}

// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } = React;


// var canoe = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('canoe', () => canoe);
