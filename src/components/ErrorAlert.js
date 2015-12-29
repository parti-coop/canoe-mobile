/**
 * # ErrorAlert.js
 *
 * This class uses a component which displays the appropriate alert
 * depending on the platform
 *
 * The main purpose here is to determine if there is an error and then
 * plucking off the message depending on the shape of the error object.
 */
'use strict';

/**
* ## Imports
*
*/
import SimpleAlert from 'react-native-simpledialog-android';
import _ from 'underscore';

var ErrorAlert = class ErrorAlertClass{
  /**
   * ## ErrorAlert
   */
  constructor(alerter) {
    this.alerter = alerter;
    if (!this.alerter) {
      this.alerter = SimpleAlert;
    }
  }
  /**
   * ### checkErro
   * determine if there is an error and how deep it is.  Take the
   * deepest level as the message and display it
   */
  checkError(obj) {
    let errorMessage = '';
    if (!_.isNull(obj)) {
      if (!_.isUndefined(obj.error)) {
        if (!_.isUndefined(obj.error.error)) {
          errorMessage = obj.error.error;
        } else {
          errorMessage = obj.error;
        }
      } else {
        errorMessage = obj;
      }
      if (errorMessage !== '') {
        if (!_.isUndefined(errorMessage.message)) {
          this.alerter.alert('Error', errorMessage.message, [{text: '확인'}]);
        } else {
          this.alerter.alert('Error', errorMessage, [{text: '확인'}]);
        }
      }
    }//isNull
  }
};

module.exports = ErrorAlert;
