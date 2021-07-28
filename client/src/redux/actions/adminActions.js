import { GET_ADMIN_PROFILE, GET_USERS_LIST } from "../constants/action-types";
import axios from "axios";

export const getUserProfile = (payload) => (dispatch) => {
  axios
    .get(`/api/adminUi/${payload.id}`, {
      headers: {
        jwt: payload.token,
      },
    })
    .then((response) => {
      dispatch({ type: GET_ADMIN_PROFILE, payload: response.data.data });
    })
    .catch((err) => console.dir(err));
};
//Admin GETs all users

export const getAllUsers = (payload) => (dispatch) => {
  axios
    .get(`/api/admin/usersList/${payload.id}`, {
      headers: {
        jwt: payload.token,
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: GET_USERS_LIST, payload: response.data.data });
    })
    .catch((err) => console.dir(err));
};

//Admin GETs All Posts

// export const getUserPosts = (payload) => (dispatch) => {
//   axios
//     .get(`/api/usersList/${payload.id}`, {
//       headers: {

//         jwt: payload.token,
//       },
//     })
//     .then((response) => {
//       dispatch({ type: GET_POSTS_LIST, payload: response.data.data });
//     })
//     .catch((err) => console.dir(err));
// };
