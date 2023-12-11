import axios from "axios";

export const PROJECT_API = process.env.REACT_APP_PROJECT_API;
export const DETAIL_API = `${PROJECT_API}/details`;
const request = axios.create({
    withCredentials: true,
});

export const getNewsReviews = async (newsId) => {
    const response = await request.get( `${DETAIL_API}/${newsId}/reviews`);
    return response.data;
};

export const addNewsReview = async (newsId, comment) => {
    const response = await request.post( `${DETAIL_API}/${newsId}/reviews`, comment);
    return response.data;
};


