import axios from "axios";
import { ADD_BOOTCAMP, BUTTON_LOADING } from "../../utils/types";
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
      type: ADD_BOOTCAMP,
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
