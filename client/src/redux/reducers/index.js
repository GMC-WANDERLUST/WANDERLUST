import { combineReducers } from "redux";
import userReducer from "./user";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({ userReducer, modalReducer });

export default rootReducer;
