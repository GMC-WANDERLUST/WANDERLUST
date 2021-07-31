import {
    OPEN_HOSTING_MODAL,
    CLOSE_HOSTING_MODAL,
    GET_USER_HOSTS,
    GET_RANDOM_USER_HOSTS,
} from "../constants/action-types";
import axios from "axios"

export function openHostingModal() {
    return {
        type: OPEN_HOSTING_MODAL,
    };
}
export function closeHostingModal() {
    return {
        type: CLOSE_HOSTING_MODAL,
    };
}
export const getUserHosts = (payload) => (dispatch) => {
    axios
        .get(`/api/host/myHosting/${payload.id}`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                jwt: payload.token,
            },
        })
        .then((response) => {
            dispatch({ type: GET_USER_HOSTS, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};
export const getRandomUserHosts = (payload) => (dispatch) => {
    axios
        .get(`/api/host/myHosting/${payload.rId}`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                jwt: payload.token,
            },
        })
        .then((response) => {
            dispatch({ type: GET_RANDOM_USER_HOSTS, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};
