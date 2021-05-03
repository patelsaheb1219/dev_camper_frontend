// File Import
import { AUTH_TOKEN } from '../../utils/types';

const initialState = {
  authToken: undefined
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload
      }
    default:
      return state;
  } 
}

export default userReducer;