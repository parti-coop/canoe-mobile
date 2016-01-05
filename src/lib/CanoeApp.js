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
   * ### login
   * encode the data and and call _fetch
   */
  async authenticate(data) {
    return this._get(CONFIG.SSO_APP.BASE_URL + '/api/v1/authenticate', data);
  }

  /**
   * ### login
   * encode the data and and call _fetch
   */
  async authorize(data) {
    return this._get(CONFIG.CANOE_APP.BASE_URL + '/app/users/api/v1/authorize', data);
  }

  /**
   * ### login
   * encode the data and and call _fetch
   */
  async _get(url, data) {
    try {
      return await this._fetch({
        method: 'GET',
        url: url + '?' + this._formBody(data)
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

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(opts.url, reqOpts);

  }

  _formBody(data) {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }
};

