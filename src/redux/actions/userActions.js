import axios from 'axios';
import { AUTH_TOKEN } from '../../utils/types';

// User Registration Action
export const userRegistration = (userInfo, history) => async dispatch => {
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
}

// // User Login Action
export const userLogin = (userInfo, history) => async dispatch => {
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