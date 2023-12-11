import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import * as client from './client';

const SearchContent = () => {
    // const searchRes = useSelector((state) => state.newsReducer.news);
    const { location} = useParams();
    const [news, setNews] = useState([]);
    const [locationUsers, setLocationUsers] = useState([]);
    const navigate = useNavigate();
    const user = window.localStorage.getItem('user');
    const [loading, setLoading] = useState(false);
    const navigateToDetails = (n) => {
        if (!user) {
            alert("You must login to see the detail page!")
            return;
        }
        window.localStorage.setItem('new', JSON.stringify(n));
        navigate(`/details/${n.id || ''}`);
    }
    useEffect(() => {
        if (location) {
            client.getLocationUsers(decodeURIComponent(location)).then(res => setLocationUsers(res || []));
            setLoading(true);
            client.searchLocationNews(location).then(res => {
                const news = newsHandler(res.news || []);
                setNews(news);
                // dispatch(setNews(news));
                setLoading(false)
            });
        } else {
            setLocationUsers([]);
            setNews([]);
        }
    }, [location]);

    const newsHandler = (response) => {
        const res = (response || []).map(n => {
            let obj = {};
            obj.title = n.title || '';
            obj.id = n.id || '';
            obj.type = n.card || '';
            obj.date = new Date(n.date * 1000).toDateString() || '';
            obj.url = n.longURL || '';
            obj.image = n.thumbnailImage || '';
            return obj;
        });
        return res;
    }
    return (
        <div>
            <div className="card w-25">
                <div className="card-body">
                    <h5 className="card-title">Colleagues in {location}</h5>
                    <p className="card-text">See who is in the city being searched</p>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        (locationUsers || []).map((user) => {
                            return (
                                <Link
                                    key={user.id}
                                    to={`/profile/${user.id || ''}`}
                                >
                                    <li className="list-group-item d-flex justify-content-between list-group-item-primary">
                                        {user.firstName || '' + " " + user.lastName || ''}
                                        <small style={{color: "gray"}}>Email: {user.email || ''}</small>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <br/>
            <h3>News:</h3>
            { loading && (
                <div className="spinner-border text-primary align-content-center m-4" role="status" style={{width: '100px', height: '100px'}}>
                    <span className="sr-only"></span>
                </div>
            ) }
            { !loading && (
                <div>
                    <ul className="list-group list-group-flush">
                        {
                            (news || []).map((n) => {
                                return (
                                    <div className="card w-50 m-2">
                                        <img src={n.image || ''} className="card-img-top" style={{maxWidth: "30%", maxHeight: "30%", borderRadius: 5, margin: "5px 5px 15px 5px"}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{ n.title || '' }</h5>
                                            <p className="card-text">{ n.date || '' }</p>
                                            <a href={n.url || ''} target="_blank" className="card-link">Go to news</a>
                                            <a className="card-link" onClick={() => navigateToDetails(n)}>
                                                Go to Detail Page
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            ) }
        </div>
    )
}

export default SearchContent;