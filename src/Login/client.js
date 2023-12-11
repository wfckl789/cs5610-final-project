import axios from "axios";

export const PROJECT_API = process.env.REACT_APP_PROJECT_API;
export const LOGIN_API = `${PROJECT_API}/login`;
const request = axios.create({
    withCredentials: true,
});

export const signin = async (credentials) => {
    const response = await request.post( `${LOGIN_API}`, credentials );
    return response.data;
};

export const signout = async () => {
    const response = await request.post(`${PROJECT_API}/signout`);
    // 清空local storage的数据
    window.localStorage.removeItem('user');
    return response.data;
};

export const signup = async (account) => {
    const response = await request.post(`${PROJECT_API}/signup`, account);
    return response.data;
}

