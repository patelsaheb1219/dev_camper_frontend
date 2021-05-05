// File Import
import { AUTH_TOKEN, BUTTON_LOADING } from '../../utils/types';

const initialState = {
  authToken: null,
  buttonLoading: false
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload
      }
    case BUTTON_LOADING:
        return {
          ...state,
          buttonLoading: action.payload
        }  
    default:
      return state;
  } 
}

export default userReducer;