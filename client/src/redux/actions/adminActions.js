import {
    GET_ADMIN_PROFILE,
    GET_USERS_LIST,
    ADMIN_GET_POSTS_LIST,
    SHOW_USERS_LIST,
    ADMIN_GET_HOSTS_LIST,
    ADMIN_GET_REPORTED_POSTS_LIST,
    ADMIN_GET_REPORTED_HOSTS_LIST,
    ADMIN_GET_MESSAGES,
} from "../constants/action-types";
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
            dispatch({ type: GET_USERS_LIST, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};

//Admin GETs All Posts

export const adminGetUsersPosts = (payload) => (dispatch) => {
    axios
        .get(`/api/admin/allPosts/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((response) => {
            dispatch({
                type: ADMIN_GET_POSTS_LIST,
                payload: response.data.data,
            });
        })
        .catch((err) => console.dir(err));
};
//Admin GETs All Reported Posts

export const adminGetReportedPosts = (payload) => (dispatch) => {
    axios
        .get(`/api/admin/reportedPosts/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((response) => {
            // console.log(response);
            dispatch({
                type: ADMIN_GET_REPORTED_POSTS_LIST,
                payload: response.data.data,
            });
        })
        .catch((err) => console.dir("reported error", err));
};
//Admin GETs All Reported Hosts

export const adminGetReportedHosts = (payload) => (dispatch) => {
    axios
        .get(`/api/admin/reportedHosts/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((response) => {
            // console.log(response);
            dispatch({
                type: ADMIN_GET_REPORTED_HOSTS_LIST,
                payload: response.data.data,
            });
        })
        .catch((err) => console.dir("reported error", err));
};
//Admin GETs All Hosts

export const adminGetHosts = (payload) => (dispatch) => {
    axios
        .get(`/api/admin/allHosts/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((response) => {
            // console.log(response);
            dispatch({
                type: ADMIN_GET_HOSTS_LIST,
                payload: response.data.hosts,
            });
        })
        .catch((err) => console.dir(err));
};
//Admin GETS All Messages
export const adminGetMessages = (payload) => (dispatch) => {
    axios
        .get(`/api/admin/messages/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((response) => {
            // console.log(response);
            dispatch({
                type: ADMIN_GET_MESSAGES,
                payload: response.data.data,
            });
        })
        .catch((err) => console.dir(err));
};

export function showUsersList() {
    return {
        type: SHOW_USERS_LIST,
    };
}
