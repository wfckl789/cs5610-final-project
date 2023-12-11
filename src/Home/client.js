import axios from "axios";

export const PROJECT_API = process.env.REACT_APP_PROJECT_API;
const request = axios.create({
    withCredentials: true,
});

export const getTeams = async () => {
    const res = await request.get(`${PROJECT_API}/teams`);
    console.log("1111", res);
    return res.data;
}

export const getMyTeam = async (userId) => {
    const res = await request.get(`${PROJECT_API}/teams/${userId}`);
    return res.data;
}

export const addTeam = async (team) => {
    const res = await request.post(`${PROJECT_API}/teams`, team);
}

export const getRecentUsers = async () => {
    const users = await request.get(`${PROJECT_API}/users`);
    const recentUsers = (users.data || []).filter(user => (user.startDate || '').toLowerCase().includes('2023'));
    return recentUsers;
}

export const getMyTasks = async (userId) => {
    const myTasks = await request.get(`${PROJECT_API}/tasks/${userId}`);
    return myTasks.data;
}

export const getMyComments = async (userId) => {
    const myTasksComments = await request.get(`${PROJECT_API}/comments/${userId}`);
    const myNewsComments = await request.get(`${PROJECT_API}/details/reviews/${userId}`);
    console.log("111111", myTasksComments, myNewsComments)
    return [...myTasksComments.data || [], ...myNewsComments.data[0].comments.filter(comment => comment.userId === userId) ];
}

export const getComment = async (commentId) => {
    const comment = await request.get(`${PROJECT_API}/comment/${commentId}`);
    return comment.data;
}