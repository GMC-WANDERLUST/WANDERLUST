import { GET_USERS_LIST } from "../constants/action-types";

const initialState = {
  usersList: [],
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
    default:
      return state;
  }
};
export default userReducer;
