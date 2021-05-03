// Module Imports
import { combineReducers } from 'redux';

// File Imports
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer
})