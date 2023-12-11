import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import SearchContent from "./SearchContent";
import {useDispatch} from "react-redux";
import {setNews} from "../store/newsReducer";
import * as client from "./client.js";
import {CiSearch} from "react-icons/ci";
import {FaSearchLocation} from "react-icons/fa";

function Search() {
    const { location} = useParams();
    const [remoteSearchInput, setRemoteSearchInput] = useState('new york');
    const navigate = useNavigate();
    useEffect(() => {
        if (location) {
            setRemoteSearchInput(location);
        }
    }, []);

    let containsSpecialCharacters = (str) => {
        return /[^\w\s]/.test(str);
    };
    const searchLocationNews = async (location) => {
        if (!location || containsSpecialCharacters(location)) {
            alert("Search input can't contain special characters or be empty!");
            setRemoteSearchInput('');
            navigate('/search');
            return;
        }
        navigate(`/search/${location}`);
    }

    return (
        <div>
            <div className="input-group mb-3 w-75">
                <div className="input-group-prepend m-2">
                     <FaSearchLocation size={30} />
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search a city from Bloomberg News!"
                    value={remoteSearchInput}
                    onChange={(e) => setRemoteSearchInput(e.target.value)}
                />
                <button type="button" className="btn btn-primary" onClick={() => searchLocationNews(remoteSearchInput)}>Search Local News</button>
            </div>
            <br/>
            {/*{JSON.stringify(remoteSearchRes)}*/}
            { location && (<SearchContent />) }
        </div>
    )
}

export default Search;