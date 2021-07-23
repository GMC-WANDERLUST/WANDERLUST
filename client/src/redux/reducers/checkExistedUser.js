import { CHECK_EXISTED_USER } from "../constants/action-types";

const initialState = {
    test: false,
};

const checkExistedUser = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case CHECK_EXISTED_USER:
            return {
                ...state,
                test: true,
            };
        default:
            return state;
    }
};
export default checkExistedUser;
