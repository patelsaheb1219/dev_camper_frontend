import axios from "axios";
import { BOOTCAMP, BUTTON_LOADING, PAGE_LOADING, COURSES } from "../../utils/types";
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
      payload: res.data.data
    })
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: BUTTON_LOADING,
    payload: false,
  });
};

export const fetchUserBootcamp = () => async dispatch => {
  dispatch({
    type: PAGE_LOADING,
    payload: true
  })
  try {
    const config = headers();
    const response = await axios.get('https://developercamper.herokuapp.com/api/v1/bootcamps/users', config)
    dispatch({
      type: BOOTCAMP,
      payload: response.data.data
    })
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: PAGE_LOADING,
    payload: false
  })
}

export const fetchBootcampCourses = (bootcampId) => async dispatch => {
  dispatch({
    type: PAGE_LOADING,
    payload: true
  })
  try {
    const config = headers();
    const response = await axios.get(`https://developercamper.herokuapp.com/api/v1/bootcamps/${bootcampId}/courses`, config);
    dispatch({
      type: COURSES,
      payload: response.data.data
    })
  } catch (err) {
    console.error(err);
  }
  dispatch({
    type: PAGE_LOADING,
    payload: false
  })
}
