// Module Imports
import axios from "axios";

// File Imports
import { AUTH_TOKEN, BUTTON_LOADING, PAGE_LOADING, USER } from "../../utils/types";
import { headers } from '../../utils/headers';

// User Registration
export const userRegistration = (userInfo, history) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const res = await axios.post(
      `https://developercamper.herokuapp.com/api/v1/auth/register`,
      userInfo
    );
    await localStorage.setItem("authToken", res.data.token);
    history.push("/home");
    dispatch({
      type: AUTH_TOKEN,
      payload: res.data.token,
    });
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false,
  });
};

// // User Login
export const userLogin = (userInfo, history) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const res = await axios.post(
      `https://developercamper.herokuapp.com/api/v1/auth/login`,
      userInfo
    );
    localStorage.setItem("authToken", res.data.token);
    history.push("/home");
    dispatch({
      type: AUTH_TOKEN,
      payload: res.data.token,
    });
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false,
  });
};

// User Token reset
export const setUserToken = (token) => (dispatch) => {
  try {
    dispatch({
      type: AUTH_TOKEN,
      payload: token,
    });
  } catch (err) {
    console.error(err);
  }
};

// Logout User
export const userLoggedOut = () => async (dispatch) => {
  try {
    await localStorage.removeItem("authToken");
    window.location.href = "/login";
    dispatch({
      type: AUTH_TOKEN,
      payload: null,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get Logged In user details
export const getLoggedInUser = () => async (dispatch) => {
  dispatch({
    type: PAGE_LOADING,
    payload: true,
  });
  console.log('here')
  try {
    const config = headers();
    const res = await axios.get(
      "https://developercamper.herokuapp.com/api/v1/auth/me",
      config
    );
    dispatch({
      type: USER,
      payload: res.data.data
    })
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: PAGE_LOADING,
    payload: false,
  });
};

// Update User Details
export const updateUserDetails = (userInfo) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const config = headers();
    const res = await axios.put(
      "https://developercamper.herokuapp.com/api/v1/auth/updatedetails",
      userInfo,
      config
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false,
  });
};
