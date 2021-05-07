// Module Imports
import { combineReducers } from 'redux';

// File Imports
import userReducer from './userReducer';
import bootcampReducer from './bootcampReducer';

export default combineReducers({
  user: userReducer,
  bootcamp: bootcampReducer
})