import { Type } from './constants';
import axios from 'axios';
export const getUsers = (page, per_page) => async dispatch => {
  try {
    dispatch({ type: Type.request });

    const { data } = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);

    dispatch({
      type: Type.sucess,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: Type.fail,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
