import { CLOSE_HOSTING_MODAL } from "../constants/action-types";
import { OPEN_HOSTING_MODAL } from "../constants/action-types";

const initialState = {
    openHosting: false,
};

const addHostingReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case OPEN_HOSTING_MODAL:
            return {
                ...state,
                openHosting: true,
            };
        case CLOSE_HOSTING_MODAL:
            return {
                ...state,
                openHosting: false,
            };
        default:
            return state;
    }
};
export default addHostingReducer;
