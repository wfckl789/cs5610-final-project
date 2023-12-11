import axios from "axios";
export const PROJECT_API = process.env.REACT_APP_PROJECT_API;
export const PROFILE_API = `${PROJECT_API}/profile`;
const request = axios.create({
    withCredentials: true,
});

export const getProfile = async (userId) => {
    const response = await request.get(`${PROFILE_API}/${userId}`);
    return response.data;
}

export const getAccount = async () => {
    const res = await request.get(`${PROJECT_API}/account`);
    return res.data;
}

export const getAccounts = async () => {
    const res = await request.get(`${PROJECT_API}/accounts`);
    return res.data;
}

export const deleteAccount = async (accountId) => {
    const res = await request.delete(`${PROJECT_API}/account/${accountId}`);
}

export const addAccount = async (account) => {
    const res = await request.post(`${PROJECT_API}/accounts`, account);
    return res.data;
}

export const updateProfile = async (user) => {
    const res = await request.post(`${PROFILE_API}/update`, user);
    return res.data;
}

export const getFollowers = async (userId) => {
    const res = await request.get(`${PROFILE_API}/${userId}/followers`);
    return res.data;
}