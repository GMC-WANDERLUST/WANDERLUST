import { GET_ADMIN_PROFILE } from "../constants/action-types";
import axios from "axios";


export const getUserProfile = (payload) => (dispatch) => {
    axios
        .get(`/api/adminUi/${payload.id}`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                jwt: payload.token,
            },
        })
        .then((response) => {
            dispatch({ type: GET_ADMIN_PROFILE, payload: response.data.data });
        })
        .catch((err) => console.dir(err));
};