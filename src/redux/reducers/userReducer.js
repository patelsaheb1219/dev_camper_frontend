// File Import
import { AUTH_TOKEN, BUTTON_LOADING, PAGE_LOADING } from "../../utils/types";

const initialState = {
  authToken: null,
  buttonLoading: false,
  pageLoading: false,
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
    default:
      return state;
  }
};

export default userReducer;
