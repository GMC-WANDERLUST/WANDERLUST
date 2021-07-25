import {
    GET_USER_PROFILE,
    CLOSE_MODAL,
    OPEN_MODAL,
    OPEN_EMAIL_MODAL,
    CLOSE_EMAIL_MODAL,
    CLOSE_ADD_POST,
    ADD_POST,
    GET_USER_POSTS,
} from "../constants/action-types";
import axios from "axios";
// import Swal from "sweetalert2";

export const getUserProfile = (payload) => (dispatch) => {
    axios
        .get(`/api/profile/UserInfos/${payload.id}`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                jwt: payload.token,
            },
        })
        .then((response) => {
            dispatch({ type: GET_USER_PROFILE, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};
export const getUserPosts = (payload) => (dispatch) => {
    axios
        .get(`/api/posts/myPosts/${payload.id}`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                jwt: payload.token,
            },
        })
        .then((response) => {
            console.log(response)
            dispatch({ type: GET_USER_POSTS, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};
export function close() {
    return {
        type: CLOSE_MODAL,
    };
}
export function openModal() {
    return {
        type: OPEN_MODAL,
    };
}
export function openEmailModal() {
    return {
        type: OPEN_EMAIL_MODAL,
    };
}
export function closeEmailModal() {
    return {
        type: CLOSE_EMAIL_MODAL,
    };
}

export function addPost() {
    return {
        type: ADD_POST,
    };
}
export function closeAddPost() {
    return {
        type: CLOSE_ADD_POST,
    };
}
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
