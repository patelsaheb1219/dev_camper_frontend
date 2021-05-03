import axios from 'axios';
import { AUTH_TOKEN } from '../../utils/types';

export const userLogin = (email, password) => async dispatch => {
  try {
    const userInfo = {
      email,
      password
    }
    let res = await axios.post(`https://developercamper.herokuapp.com/api/v1/auth/login`, userInfo);
    dispatch ({
      type: AUTH_TOKEN,
      payload: res.data.token
    });
  } catch (err) {
    console.error(err);
  }
}