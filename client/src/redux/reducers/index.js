import { combineReducers } from "redux";
import userReducer from "./user";
import checkExistedUser from "./checkExistedUser";

const rootReducer = combineReducers({ userReducer, checkExistedUser });

export default rootReducer;
