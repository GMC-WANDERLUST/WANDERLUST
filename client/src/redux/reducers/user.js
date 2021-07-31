import {
    GET_USER_PROFILE,
    GET_RANDOM_USER_PROFILE,
} from "../constants/action-types";

const initialState = {
    user: [],
};

const userReducer = (state = initialState, action) => {
    // eslint-disable-next-line
    const { type, payload } = action;
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                user: payload,
            };
        case GET_RANDOM_USER_PROFILE:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};
export default userReducer;
