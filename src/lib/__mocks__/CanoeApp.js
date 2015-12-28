/**
 * # Parse.js
 *
 * This class mocks lib/Parse.js
 *
 */
'use strict';
/**
 * ## Async
 *
 * Need to still treat as async
 */
require('regenerator/runtime');
export default class CanoeApp  {
  /**
   * ## Parse
   *
   * ### constructor
   * prepare the response for all the methods
   */
  constructor(){
    var _bodyInit = JSON.stringify({
      code: 200
    });
    this.response = {
      "status": 201
    };
    this.response._bodyInit = _bodyInit;
  }

  /**
   * ### login
   * @returns {Object} response
   */
  async login() {
    return await this.response;
  }
}

