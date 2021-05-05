import axios from 'axios';
import { AUTH_TOKEN, BUTTON_LOADING } from '../../utils/types';

// User Registration Action
export const userRegistration = (userInfo, history) => async dispatch => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true
  })
  try {
    const res = await axios.post(`https://developercamper.herokuapp.com/api/v1/auth/register`, userInfo);
    localStorage.setItem('authToken', res.data.token);
    history.push('/home');
    dispatch ({
      type: AUTH_TOKEN,
      payload: res.data.token
    });
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false
  })
}

// // User Login Action
export const userLogin = (userInfo, history) => async dispatch => {
  dispatch({
    type: BUTTON_LOADING,
    payload: true
  })
  try {
    const res = await axios.post(`https://developercamper.herokuapp.com/api/v1/auth/login`, userInfo);
    localStorage.setItem('authToken', res.data.token);
    history.push('/home');
    dispatch ({
      type: AUTH_TOKEN,
      payload: res.data.token
    });
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false
  })
}

// User Token reset Action
export const setUserToken = (token) => dispatch => {
  try {
    dispatch({
      type: AUTH_TOKEN,
      payload: token
    })
  } catch(err) {
    console.error(err)
  }
}

export const userLoggedOut = (history) => async dispatch => {
  try {
    await localStorage.removeItem('authToken');
    window.location.href = '/login';
    dispatch({
      type: AUTH_TOKEN,
      payload: null
    })
  } catch(err) {
    console.error(err)
  }
}