import {useState} from "react";
import * as client from './client'
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userReducer";

function Login() {
    const [credentials, setCredentials] = useState({ username: "admin", password: "12345" });
    const [newAccount, setNewAccount] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const signin = async () => {
        const currentUser = await client.signin(credentials);
        if (!currentUser) {
            alert("Account doesn't exist! Please sign up a new account first.");
            return;
        }
        window.localStorage.setItem('user', JSON.stringify(currentUser));
        // dispatch(setUser(currentUser));
        navigate(`/profile/${currentUser.id || ''}`);
    };
    const signout = async () => {
        await client.signout();
        alert("You have signed out!");
        navigate('/home');
    }
    const signup = async (account) => {
        account = {
            ...account,
            id: new Date().getTime().toString(),
            firstName: '',
            lastName: '',
            role: '',
            startDate: '',
            email: '',
            phone: '',
            team: '',
            desc: '',
            likes: [],
            location: '',
        };
        const res = await client.signup(account);
        if (res && res === 400) {
             alert("Account has existed!");
        } else if (res && res === 200) {
            alert("Create the account successfully!");
        }
        setNewAccount({ username: "", password: "" });
    }

    return (
        <div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="username">Username:</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                        aria-describedby="username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="password">Password:</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="password"
                        aria-describedby="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                </div>
                <button type="button" className="btn btn-primary float-end w-25" style={{marginLeft: 20}} onClick={signin}>Sign in</button>
            </div>
            <hr/>
            <button type="button" className="btn btn-danger w-25" style={{marginLeft: 10}} onClick={signout}>Sign out</button>
            <hr/>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="newUsername">username:</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="new account username"
                        aria-describedby="newUsername"
                        value={newAccount.username}
                        onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="newPassword">password:</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="new account password"
                        aria-describedby="newPassword"
                        value={newAccount.password}
                        onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                    />
                </div>
                <button type="button" className="btn btn-success float-end w-25" style={{marginLeft: 20}} onClick={() => signup(newAccount)}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login;