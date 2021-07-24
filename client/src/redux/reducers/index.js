import { combineReducers } from "redux";
import userReducer from "./user";
import modalReducer from "./modalReducer";
import addHostingReducer from "./addHostingReducer";
import modalEmailReducer from "./emailReducer";

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    modalEmailReducer,
    addHostingReducer,
});

export default rootReducer;
