import { CLOSE_MODAL } from "../constants/action-types";
import { OPEN_MODAL } from "../constants/action-types";

const initialState = {
    test: false,
};

const modalReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case OPEN_MODAL:
            return {
                ...state,
                test: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                test: false,
            };
        default:
            return state;
    }
};
export default modalReducer;
