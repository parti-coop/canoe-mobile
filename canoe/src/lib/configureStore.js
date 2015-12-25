/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict';

/**
 * ## Imports
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
};
