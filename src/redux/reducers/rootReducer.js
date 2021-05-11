// Module Imports
import { combineReducers } from 'redux';

// File Imports
import userReducer from './userReducer';
import bootcampReducer from './bootcampReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  user: userReducer,
  bootcamp: bootcampReducer,
  course: courseReducer
})