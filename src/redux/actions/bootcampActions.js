// Module Import
import axios from "axios";

// File Imports
import {
  BOOTCAMP,
  BUTTON_LOADING,
  PAGE_LOADING,
  ALL_BOOTCAMPS
} from "../../utils/types";
import { headers } from "../../utils/headers";

export const getAllBootcamps = () => async dispatch => {
  dispatch({
    type: PAGE_LOADING,
    payload: true,
  });
  try {
    const response = await axios.get(`https://developercamper.herokuapp.com/api/v1/bootcamps`);
    dispatch({
      type: ALL_BOOTCAMPS,
      payload: response.data.data
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
    throw err
  }
}

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