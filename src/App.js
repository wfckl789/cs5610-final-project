import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Login from "./Login";
import Profile from "./Profile";
import {Provider} from "react-redux";
import store from "./store";
import Navigator from "./components/Navigator";
import Details from "./Details";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <div className="d-flex">
                    <Navigator />
                    <div className="row">
                        <p style={{fontSize: 30, fontFamily: 'Arial'}}>Welcome to Project Management Platform</p>
                        <div>
                            <Routes>
                                <Route path="/"         element={<Home/>}/>
                                <Route path="/home"     element={<Home/>}/>
                                <Route path="/profile/*"  element={<Profile/>}/>
                                <Route path="/profile/:userId"    element={<Profile/>}/>
                                <Route path="/search/*" element={<Search/>}/>
                                <Route path="/search/:location" element={<Search/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/details" element={<Details/>}/>
                                <Route path="/details/:newsId" element={<Details/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </HashRouter>
        </Provider>
    );
}

export default App;
