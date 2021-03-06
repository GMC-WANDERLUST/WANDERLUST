import {
    GET_USER_PROFILE,
    GET_RANDOM_USER_PROFILE,
} from "../constants/action-types";

const initialState = {
    randomUser: [],
    user: [],
    test: false,
};

const userReducer = (state = initialState, action) => {
    // eslint-disable-next-line
    const { type, payload } = action;
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                user: payload,
                test: true,
            };
        case GET_RANDOM_USER_PROFILE:
            return {
                ...state,
                randomUser: payload,
                test: true,
            };
        default:
            return state;
    }
};
export default userReducer;
