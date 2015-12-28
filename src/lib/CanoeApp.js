/**
 * # CanoeApp.js
 *
 * This class interfaces with canoe.parti.xyz using the rest api
 *
 */
'use string';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config';
import _ from 'underscore';

export default class CanoeApp {
  /**
   * ## Canoe
   *
   * constructor sets the default keys required by Parse.com
   * if a user is logged in, we'll need the sessionToken
   *
   */
  constructor(sessionToken) {
    this._masterKey = null;
    this._sessionToken = _.isUndefined(sessionToken) ? null :  sessionToken;
    this.API_BASE_URL= 'https://canoe.parti.xyz';
  }

  /**
   * ### login
   * encode the data and and call _fetch
   */
  async login(data) {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    try {
      return await this._fetch({
        method: 'GET',
        url: '/1/login?' + formBody
      });
    } catch(error) {
      throw error;
    }
  }

  /**
   * ### _fetch
   * A generic function that prepares the request to Parse.com
   */
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method
    };
    if (this._sessionToken) {
      reqOpts.headers['X-Parse-Session-Token'] = this._sessionToken;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(this.API_BASE_URL + opts.url, reqOpts);

  }
};

