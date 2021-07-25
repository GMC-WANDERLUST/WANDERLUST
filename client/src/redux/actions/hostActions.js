import {
    OPEN_HOSTING_MODAL,
    CLOSE_HOSTING_MODAL,
   
} from "../constants/action-types";

export function openHostingModal() {
    return {
        type: OPEN_HOSTING_MODAL,
    };
}
export function closeHostingModal() {
    return {
        type: CLOSE_HOSTING_MODAL,
    };
}
