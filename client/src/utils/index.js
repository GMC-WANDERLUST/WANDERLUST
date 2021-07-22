export function login(token) {
    localStorage.setItem("jwt", token);
}
export function getToken() {
    return localStorage.getItem("jwt");
}
export function saveId(id) {
    localStorage.setItem("userId", id);
}
export function userId() {
    return localStorage.getItem("userId");
}
export function logout() {
    localStorage.clear();
}
export function isLoggedIn() {
    if (localStorage.getItem("jwt")) {
        return true;
    }
    return false;
}
export function savePhotoUrl(url) {
    localStorage.setItem("photoUrl", url);
}
export function getPhotoUrl() {
    return localStorage.getItem("photoUrl");
}