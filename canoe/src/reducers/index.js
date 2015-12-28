/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use string';

/**
 * ## Imports
 */
import auth from './auth/authReducer';
import device from './device/deviceReducer';
import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  device, auth
});

export default rootReducer;
