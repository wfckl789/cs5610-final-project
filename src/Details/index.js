import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import * as client from './client';
import {Link} from "react-router-dom";
import {CgProfile} from "react-icons/cg";

function Details() {
    const { newsId } = useParams();
    const newDetail = JSON.parse(window.localStorage.getItem('new'));
    const user = JSON.parse(window.localStorage.getItem('user') || {});
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const addNewsReview = async (comment) => {
        const obj = {
            userId: user.id || '',
            content: comment,
            userName: user.firstName || '' + ' ' + user.lastName || '',
            created: new Date().toDateString()
        };
        const review = await client.addNewsReview(newsId, obj);
        setReviews(review);
        window.location.reload();
    }
    const fetchData = async () => {
        try {
            const latestReviews = await client.getNewsReviews(newsId);
            console.log("11111111", latestReviews);
            setReviews(latestReviews[0]);
        } catch (e) {
            console.log(e);
        }
    }
    const toProfile =(userId) => {
        navigate(`/profile/${userId}`);
    }
    useEffect(() => {
        fetchData(newsId);
    }, []);

    return (
        <div>
            <div className="input-group mb-3 w-50">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a review to this news."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="button" className="btn btn-primary" onClick={() => addNewsReview(comment)}>Add Review</button>
            </div>
            <h4>Reviews: </h4>
            <div className="list-group w-50">
                {
                    (reviews.comments || []).map(comment => {
                        return (
                            <div>
                                <a className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{ comment.content || '' }</h5>
                                        <small className="text-muted">{ comment.created || '' }</small>
                                    </div>
                                    <small className="text-muted">
                                        -- from
                                        <button type="button" className="btn btn-primary"  onClick={() => toProfile(comment.userId || '')}>
                                            <CgProfile /> { comment.userName || '' }
                                        </button>
                                    </small>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
            <br/>
            <div className="card w-75">
                <img
                    src={newDetail.image || ''}
                    className="card-img-top"
                    style={{maxWidth: "40%", maxHeight: "40%", borderRadius: 5, margin: "5px 5px 15px 5px"}}
                />
                    <div className="card-body">
                        <h5 className="card-title">{ newDetail.title || '' }</h5>
                        <p className="card-text">Post Date: { newDetail.date || '' }</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">News Type: { newDetail.type || '' }</li>
                    </ul>
                    <div className="card-body">
                        <a href={ newDetail.url || '' } className="card-link" target="_blank">News Link</a>
                    </div>
            </div>
        </div>
    )
}

export default Details;