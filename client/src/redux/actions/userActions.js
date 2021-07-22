// import { GET_USER_PROFILE } from "../constants/action-types";
import axios from "axios";
// import Swal from "sweetalert2";

export const getUserProfile = (payload) => (dispatch) => {
    axios
        .get(
            `/api/profile/UserInfos/${payload.id}`,
            {},
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    jwt: payload.token,
                },
            }
        )
        .then((response) => {
            console.log(response);
            // dispatch({ type: GET_USER_PROFILE, payload: response.data });
        })
        .catch((err) => console.dir(err));
};
// export const createUser = (payload) => (dispatch) => {
//     axios
//         .post(`/api/profile/addUserInfos/${payload.newUserId}`, {})
//         .then(() => dispatch(getUserInfos()))
//         .catch((err) => console.log(err));
// };

// export const deleteContact = (payload) => (dispatch) => {
//     axios
//         .delete(`/api/deleteContact/${payload.id}`)
//         .then(() => dispatch(getContacts()))
//         .catch((err) => console.log(err));
// };

// export const editContact = (payload) => (dispatch) => {
//     axios
//         .put(`/api/editContact/${payload.id}`, payload.edited)
//         .then(() => dispatch(getContacts()))
//         .catch((err) => console.log(err));
// };
