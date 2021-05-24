// File Import
import { ALL_COURSES, COURSES } from "../../utils/types";

const initialState = {
  courses: [],
  allCourses: []
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSES:
      return {
        ...state,
        courses: action.payload
      }
    case ALL_COURSES:
      return {
        ...state,
        allCourses: action.payload
      }
    default:
      return state;
  }
};

export default courseReducer;
