// File Import
import { BOOTCAMP, COURSES } from "../../utils/types";

const initialState = {
  bootcamp: null,
  courses: []
};

const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload
      }
    case COURSES:
      return {
        ...state,
        courses: action.payload
      }
    default:
      return state;
  }
};

export default bootcampReducer;
