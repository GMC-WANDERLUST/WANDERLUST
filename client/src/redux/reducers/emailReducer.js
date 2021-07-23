import { CLOSE_EMAIL_MODAL } from "../constants/action-types";
import { OPEN_EMAIL_MODAL } from "../constants/action-types";

const initialState = {
    testEmail: false,
};

const modalEmailReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case OPEN_EMAIL_MODAL:
            return {
                ...state,
                testEmail: true,
            };
        case CLOSE_EMAIL_MODAL:
            return {
                ...state,
                testEmail: false,
            };
        default:
            return state;
    }
};
export default modalEmailReducer;
