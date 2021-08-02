import {
    GET_USERS_LIST,
    ADMIN_GET_POSTS_LIST,
    SHOW_USERS_LIST,
    ADMIN_GET_HOSTS_LIST,
    ADMIN_GET_REPORTED_POSTS_LIST,
    ADMIN_GET_REPORTED_HOSTS_LIST,
} from "../constants/action-types";

const initialState = {
  usersList: [],
  adminPostsList : [],
  adminReportedPosts : [],
  adminReportedHosts : [],
  adminTest: false,
  showTheList : false,
  adminHostsList : []
};

const adminReducer = (state = initialState, action) => {
  // eslint-disable-next-line
  const { type, payload } = action;
  switch (type) {
      case GET_USERS_LIST:
          return {
              ...state,
              usersList: payload,
              adminTest: true,
          };
      case ADMIN_GET_POSTS_LIST:
          return {
              ...state,
              adminPostsList: payload,
              adminTest: true,
          };
      case ADMIN_GET_REPORTED_POSTS_LIST:
          return {
              ...state,
              adminReportedPosts: payload,
              adminTest: true,
          };
      case ADMIN_GET_REPORTED_HOSTS_LIST:
          return {
              ...state,
              adminReportedHosts: payload,
              adminTest: true,
          };
      case ADMIN_GET_HOSTS_LIST:
          return {
              ...state,
              adminHostsList: payload,
              adminTest: true,
          };
      case SHOW_USERS_LIST:
          return {
              showTheList: !state.showTheList,
              adminTest: true,
          };
      default:
          return state;
  }
};
export default adminReducer;
