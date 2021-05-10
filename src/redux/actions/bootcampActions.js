// Module Import
import axios from "axios";

// File Import
import store from '../store';
import {
  BOOTCAMP,
  BUTTON_LOADING,
  PAGE_LOADING,
  COURSES,
} from "../../utils/types";
import { headers } from "../../utils/headers";

export const createBootcamp = (bootcamp) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const res = await axios.post(
      "https://developercamper.herokuapp.com/api/v1/bootcamps",
      bootcamp,
      await headers()
    );
    dispatch({
      type: BOOTCAMP,
      payload: res.data.data,
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

export const fetchUserBootcamp = () => async (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
    payload: true,
  });
  try {
    const config = headers();
    const response = await axios.get(
      "https://developercamper.herokuapp.com/api/v1/bootcamps/users",
      config
    );
    dispatch({
      type: BOOTCAMP,
      payload: response.data.data,
    });
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: PAGE_LOADING,
    payload: false,
  });
};

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
    type: PAGE_LOADING,
    payload: true,
  });
  try {
    const config = headers();
    const bootcamp = await store.getState().bootcamp.bootcamp;
    const response = await axios.post(
      `https://developercamper.herokuapp.com/api/v1/bootcamps/${bootcamp.id}/courses`,
      course,
      config
    );
    let courses = await store.getState().bootcamp.courses;
    courses.push(response.data.data);
    dispatch({
      type: COURSES,
      payload: courses
    })
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
