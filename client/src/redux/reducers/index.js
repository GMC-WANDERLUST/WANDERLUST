import { combineReducers } from "redux";
import userReducer from "./user";
import modalReducer from "./modalReducer";
import addHostingReducer from "./addHostingReducer";
import modalEmailReducer from "./emailReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    modalEmailReducer,
    addHostingReducer,
    postReducer,
});

export default rootReducer;
