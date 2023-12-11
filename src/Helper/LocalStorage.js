export const setLocalUser = (obj) => {
    window.localStorage.setItem('user', JSON.stringify(obj));
}
export const getLocalUser = () => {
    window.localStorage.getItem('user');
}