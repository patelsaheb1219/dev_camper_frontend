// File Import
import { COURSES } from "../../utils/types";

const initialState = {
  courses: []
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSES:
      return {
        ...state,
        courses: action.payload
      }
    default:
      return state;
  }
};

export default courseReducer;
