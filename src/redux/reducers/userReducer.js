// File Import
import { AUTH_TOKEN, BUTTON_LOADING, PAGE_LOADING, USER } from "../../utils/types";

const initialState = {
  authToken: null,
  buttonLoading: false,
  pageLoading: false,
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: action.payload,
      };
    case PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.payload
      }
    case USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
