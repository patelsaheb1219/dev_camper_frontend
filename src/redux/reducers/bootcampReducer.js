// File Import
import { BOOTCAMP } from "../../utils/types";

const initialState = {
  bootcamp: null
};

const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
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
