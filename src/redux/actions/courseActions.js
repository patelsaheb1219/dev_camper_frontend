// Module Import
import axios from "axios";

// File Import
import store from "../store";
import {
  BUTTON_LOADING,
  PAGE_LOADING,
  COURSES,
} from "../../utils/types";
import { headers } from "../../utils/headers";

export const fetchBootcampCourses = (bootcampId) => async (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
    payload: true,
  });
  try {
    const config = headers();
    const response = await axios.get(
      `https://developercamper.herokuapp.com/api/v1/bootcamps/${bootcampId}/courses`,
      config
    );
    dispatch({
      type: COURSES,
      payload: response.data.data,
    });
    dispatch({
      type: PAGE_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: PAGE_LOADING,
      payload: false,
    });
    throw err;
  }
};

export const createCourse = (course) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const bootcamp = await store.getState().bootcamp.bootcamp;
    const response = await axios.post(
      `https://developercamper.herokuapp.com/api/v1/bootcamps/${bootcamp.id}/courses`,
      course,
      await headers()
    );
    let courses = await store.getState().course.courses;
    courses = [response.data.data, ...courses];
    dispatch({
      type: COURSES,
      payload: courses,
    });
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
    throw err;
  }
};

export const updatedCourse = (course) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const response = await axios.put(
      `https://developercamper.herokuapp.com/api/v1/courses/${course._id}`,
      course,
      headers()
    );
    let courses = await store.getState().course.courses;
    courses = courses.map((c) =>
      c._id === course._id ? response.data.data : c
    );
    dispatch({
      type: COURSES,
      payload: courses,
    });
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
    throw err;
  }
};

export const deletedCourse = (courseId) => async dispatch =>  {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const response = await axios.delete(
      `https://developercamper.herokuapp.com/api/v1/courses/${courseId}`,
      headers()
    );
    if (response.data.success) {
      let courses = await store.getState().course.courses;
      courses = courses.filter((c) => c._id !== courseId);
      dispatch({
        type: COURSES,
        payload: courses,
      });
    }
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: BUTTON_LOADING,
      payload: true,
    });
    throw err;
  }
};
