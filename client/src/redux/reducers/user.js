import { GET_USER_PROFILE } from "../constants/action-types";

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
                user: payload.data,
            };
        default:
            return state;
    }
};
export default userReducer;
