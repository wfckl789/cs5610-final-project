import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import './Navigator.css'

function Navigator () {
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    const links = ["Home", "Login", "Profile", "Search"];
    const { pathname } = useLocation();
    const logoURL = "https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const icons = [];
    const handleClick = (event, link) => {
        console.log("click", link);
        if (link === links[2] && !JSON.parse(window.localStorage.getItem('user'))) {
            event.preventDefault();
            alert("You can not get access to the profile page unless logged in!");
        }
    }

    return (
        <div style={{backgroundColor: "#487DCC", width: 150, maxHeight: "100%", marginRight: 20, textAlign: "center"}}>
            <img src={logoURL} style={{maxWidth: "85%", maxHeight: "80%", borderRadius: 25, margin: "10px 5px 5px 5px"}}/>
            <div className="nav flex-column nav-pills">
                { currentUser && (
                    <div>
                        <p>Welcome! {currentUser.firstName}</p>
                    </div>
                ) }
                { !currentUser && (
                    <Link to={'/login'}  style={{textDecoration: "none"}}>
                        <p style={{fontSize: 25, color: "white"}}>Login</p>
                    </Link>
                ) }
                {
                    links.map((link, index) => {
                        return (
                            <li className="nav-item">
                                <Link
                                    key={index}
                                    to={`/${link.toLowerCase()}`}
                                    onClick={(e) => handleClick(e, link)}
                                    className={`nav-link ${pathname.includes(link.toLowerCase()) && "active"}`}
                                >
                                    {/*{icons[index]}*/}
                                    <p style={{fontSize: 20}}>{link}</p>
                                </Link>
                            </li>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Navigator;