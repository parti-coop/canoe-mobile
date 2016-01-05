/**
 * # AppSession.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 */
'use string';
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store';
import CONFIG from './config';


export default class AppSession {
  /**
   * ## AppAuth
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_KEY = CONFIG.CANOE_APP.SESSION_KEY;
  }

  /**
   * ### storeSession
   * Store the session key
   */
  store(data) {
    return store.save(this.SESSION_KEY, data);

  }
  /**
   * ### getSession
   * @param {Object} session the currentUser object from Parse.com
   */
  get() {
    return store.get(this.SESSION_KEY);
  }
  /**
   * ### deleteSession
   * Deleted during log out
   */
  delete() {
    return store.delete(this.SESSION_KEY);
  }
}

