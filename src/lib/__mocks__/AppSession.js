/**
 * # AppAuthToken.js
 *
 * Simple mock of lib/AppAuthToken.js
 */
'use strict';
/**
 * ## Async
 *
 * Need to still treat as async
 */
require('regenerator/runtime');
export default class AppSession {
  /**
   * ## AppSession
   *
   * ### get
   * @returns {Object} sessionToken
   */
  async get() {
    return await {
      user: {
        id: 100,
        email: 'test@gmail.com',
        nickname: 'ok'
      },
      token: 'token'
    };
  }
  /**
   * ### store
   * @returns {Object} empty
   */
  async store() {
    return await {};
  }
  /**
   * ### delete
   */
  async delete() {
    return await {};
  }
}


