import { combineReducers } from "redux";
import userReducer from "./user";
import modalReducer from "./modalReducer";
import modalEmailReducer from "./emailReducer";

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    modalEmailReducer,
});

export default rootReducer;
