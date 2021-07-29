import {
    CLOSE_HOSTING_MODAL,
    OPEN_HOSTING_MODAL,
    GET_HOSTS_BY_DESTINATION,
    GET_USER_HOSTS,
    GET_RANDOM_USER_HOSTS,
} from "../constants/action-types";

const initialState = {
    openHosting: false,
    userHosts: [],
    hostsByDestination : []
};

const hostingReducer = (state = initialState, action) => {
    const { type, payload } = action;
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
        case GET_USER_HOSTS:
            return {
                ...state,
                userHosts: payload,
            };
        case GET_RANDOM_USER_HOSTS:
            return {
                ...state,
                userHosts: payload,
            };
        case GET_HOSTS_BY_DESTINATION:
            return {
                ...state,
                hostsByDestination: payload,
            };
        default:
            return state;
    }
};
export default hostingReducer;
