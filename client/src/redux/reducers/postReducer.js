import {
    ADD_POST,
    CLOSE_ADD_POST,
    GET_USER_POSTS,
    GET_POSTS_BY_DESTINATION,
    GET_POSTS_BY_CITY,
    GET_RANDOM_USER_POSTS,
} from "../constants/action-types";

const initialState = {
    openPost: false,
    userPosts: [],
    postsByDestination : [],
    postsByCity : []
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
        case GET_RANDOM_USER_POSTS:
            return {
                ...state,
                userPosts: payload,
            };
        case GET_POSTS_BY_DESTINATION:
            return {
                ...state,
                postsByDestination: payload,
            };
        case GET_POSTS_BY_CITY:
            return {
                ...state,
                postsByCity: payload,
            };

        default:
            return state;
    }
};
export default postReducer;
