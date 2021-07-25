import {
    ADD_POST,
    CLOSE_ADD_POST,
    GET_USER_POSTS,
} from "../constants/action-types";

const initialState = {
    openPost: false,
    userPosts: [],
};

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_POST:
            return {
                ...state,
                openPost: true,
            };
        case CLOSE_ADD_POST:
            return {
                ...state,
                openPost: false,
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: payload,
            };

        default:
            return state;
    }
};
export default postReducer;
