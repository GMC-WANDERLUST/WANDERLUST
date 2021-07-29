import { GET_USERS_LIST, GET_POSTS_LIST } from "../constants/action-types";

const initialState = {
  usersList: [],
  postsList :[],
};

const adminReducer = (state = initialState, action) => {
  // eslint-disable-next-line
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_LIST:
      return {
        ...state,
        usersList: payload,
      };
    case GET_POSTS_LIST:
      return {
        ...state,
        postsList: payload,
      };

    default:
      return state;
  }
};
export default adminReducer;
