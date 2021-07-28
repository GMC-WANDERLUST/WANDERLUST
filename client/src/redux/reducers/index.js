import { combineReducers } from "redux";
import userReducer from "./user";
import modalReducer from "./modalReducer";
import hostingReducer from "./hostingReducer";
import modalEmailReducer from "./emailReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer"

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    modalEmailReducer,
    hostingReducer,
    postReducer,
    adminReducer,
});

export default rootReducer;
