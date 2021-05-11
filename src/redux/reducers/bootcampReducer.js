// File Import
import { BOOTCAMP, ALL_BOOTCAMPS } from "../../utils/types";

const initialState = {
  bootcamps: [],
  bootcamp: null
};

const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload
      }
    case BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload
      }
    default:
      return state;
  }
};

export default bootcampReducer;
