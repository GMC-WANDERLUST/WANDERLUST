import {
    GET_USERS_LIST,
    ADMIN_GET_POSTS_LIST,
    SHOW_USERS_LIST,
    ADMIN_GET_HOSTS_LIST,
} from "../constants/action-types";

const initialState = {
  usersList: [],
  adminPostsList : [],
  showTheList : false,
  adminHostsList : []
};

const userReducer = (state = initialState, action) => {
  // eslint-disable-next-line
  const { type, payload } = action;
  switch (type) {
      case GET_USERS_LIST:
          return {
              ...state,
              usersList: payload,
          };
      case ADMIN_GET_POSTS_LIST:
          return {
              ...state,
              adminPostsList: payload,
          };
      case ADMIN_GET_HOSTS_LIST:
          return {
              ...state,
              adminHostsList: payload,
          };
      case SHOW_USERS_LIST:
          return {
              showTheList: !state.showTheList,
          };
      default:
          return state;
  }
};
export default userReducer;
