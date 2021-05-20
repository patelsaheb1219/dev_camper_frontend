// Module Imports
import axios from "axios";

// File Imports
import { AUTH_TOKEN, BUTTON_LOADING, USER } from "../../utils/types";
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
      type: USER,
      payload: res.data.user
    })
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
    await localStorage.setItem("authToken", res.data.token);
    await localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch({
      type: USER,
      payload: res.data.user
    })
    dispatch({
      type: AUTH_TOKEN,
      payload: res.data.token,
    });
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
    history.push("/home");
  } catch (err) {
    dispatch({
      type: BUTTON_LOADING,
      payload: false,
    });
    throw err;
  }
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

// User Reset
export const setUser = (user) => (dispatch) => {
  try {
    dispatch({
      type: USER,
      payload: user
    })
  } catch (err) {
    console.error(err);
  }
}

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
    throw err;
  }
};

// Update User Details
export const updateUserDetails = (userInfo) => async (dispatch) => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    const response = await axios.put(
      "https://developercamper.herokuapp.com/api/v1/auth/updatedetails",
      userInfo,
      await headers()
    );
    await localStorage.setItem("user", JSON.stringify(response.data.data))
    dispatch({
      type: USER,
      payload: response.data.data
    })
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

// Update User Password
export const updateUserPassword = (password) => async dispatch => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true,
  });
  try {
    await axios.put(`https://developercamper.herokuapp.com/api/v1/auth/updatepassword`, password, headers())
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
}
