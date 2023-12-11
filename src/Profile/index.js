import PrivateDetails from "./PrivateDetails";
import PublicDetails from "./PublicDetails";
import Details from "../Details";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import * as client from "./client";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Profile() {
    // const currentUser = useSelector((state) => state.userReducer.user);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [visitor, setVisitor] = useState(false);
    const [newAccount, setNewAccount] = useState({});
    const currentUser = JSON.parse(window.localStorage.getItem('user')) || { id: '' };
    const userId = useParams().userId || currentUser.id || '';
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    const updateProfile = async (user) => {
        const res = await client.updateProfile(user);
        alert("User info updates successfully!");
        if (currentUser && currentUser.role === 'admin') {
            window.location.reload();
            return;
        }
        window.localStorage.setItem('user', JSON.stringify(res))
        setUser(res);
        window.location.reload();
    }
    const deleteUser = async (userId) => {
        await client.deleteAccount(userId);
        window.location.reload();
    }
    const addNewAccount = async () => {
        const res = await client.addAccount({ ...newAccount, id: new Date().getTime().toString() } );
        handleClose();
        window.location.reload();
    }

    useEffect( () => {
        setUser(currentUser);
        if (userId !== currentUser.id) {
            client.getProfile(userId).then(res => setUser(res[0] || {}));
        }
        setVisitor(userId !== currentUser.id);
        if (userId) {
            client.getFollowers(userId).then(res => setFollowers(res || []));
        }
        if (currentUser && currentUser.role === 'admin') {
            client.getAccounts().then(res => setUsers(res || []));
        }
    }, [userId]);
    return (
        <div className="row">
            <div className="col-md-5">
                {/*current user: {JSON.stringify(currentUser)}*/}
                {/*<br/>*/}
                {/*user id {currentUser.id}*/}
                {/*<br/>*/}
                {/*page id {user.id}*/}
                {/*<br/>*/}
                {/*query info {JSON.stringify(user)}*/}
                <img
                    src="https://plus.unsplash.com/premium_photo-1661944456241-c920f93bd87b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top"
                    style={{maxWidth: "20%", maxHeight: "20%", borderRadius: 5, margin: "5px 5px 15px 5px"}}
                />
                {(!visitor || (currentUser && currentUser.role === 'admin')) &&
                    <div>
                        <button type="button" className="btn btn-primary" style={{marginBottom: 20}} onClick={() => updateProfile(user)}>Update</button>
                        <div className="input-group input-group-sm mb-3 w-50">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="id">Id</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                aria-describedby="id"
                                value={user.id || ''}
                                disabled={true}
                            />
                        </div>
                        <div className="input-group input-group-sm mb-3 w-50">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="username">Username</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                aria-describedby="username"
                                value={user.username || ''}
                                onChange={(e) => setUser({ ...user,
                                    username: e.target.value })}
                            />
                        </div>
                        <div className="input-group input-group-sm mb-3 w-50">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="password">Password</span>
                            </div>
                            <input
                                type="text"
                                className="form-control col-10"
                                aria-describedby="password"
                                value={user.password || ''}
                                onChange={(e) => setUser({ ...user,
                                    password: e.target.value })}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="firstName">First name</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.firstName || ''}
                            aria-describedby="firstName"
                            onChange={(e) => setUser({ ...user,
                                firstName: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="lastName">Last name</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.lastName || ''}
                            aria-describedby="lastName"
                            onChange={(e) => setUser({ ...user,
                                lastName: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                    { currentUser && currentUser.role === 'admin' && (
                        <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="role">Role</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.role || ''}
                            aria-describedby="role"
                            onChange={(e) => setUser({ ...user,
                                role: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                    )}
                    <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="email">Email</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.email || ''}
                            aria-describedby="email"
                            onChange={(e) => setUser({ ...user,
                                email: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="phone">Phone</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.phone || ''}
                            aria-describedby="phone"
                            onChange={(e) => setUser({ ...user,
                                phone: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3 w-50">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="location">Location</span>
                        </div>
                        <input
                            type="text"
                            className="form-control col-10"
                            value={user.location || ''}
                            aria-describedby="location"
                            onChange={(e) => setUser({ ...user,
                                location: e.target.value })}
                            disabled={visitor && (currentUser && currentUser.role !== 'admin')}
                        />
                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="form-control m-2"
                            value={newAccount.username}
                            onChange={(e) => {setNewAccount({ ...newAccount, username: e.target.value })}}
                            placeholder="username: "
                        />
                        <input
                            className="form-control m-2"
                            value={newAccount.password}
                            onChange={(e) => {setNewAccount({ ...newAccount, password: e.target.value })}}
                            placeholder="password: "
                        />
                        <input
                            className="form-control m-2"
                            value={newAccount.firstName}
                            onChange={(e) => {setNewAccount({ ...newAccount, firstName: e.target.value })}}
                            placeholder="first name: "
                        />
                        <input
                            className="form-control m-2"
                            value={newAccount.lastName}
                            onChange={(e) => {setNewAccount({ ...newAccount, lastName: e.target.value })}}
                            placeholder="last name: "
                        />
                        <input
                            className="form-control m-2"
                            value={newAccount.role}
                            onChange={(e) => {setNewAccount({ ...newAccount, role: e.target.value })}}
                            placeholder="role: "
                        />
                        <input
                            className="form-control m-2"
                            value={newAccount.email}
                            onChange={(e) => {setNewAccount({ ...newAccount, email: e.target.value })}}
                            placeholder="email: "
                        />
                        <input
                            type="date"
                            className="form-control m-2"
                            value={newAccount.startDate}
                            onChange={(e) => {setNewAccount({ ...newAccount, startDate: e.target.value })}}
                            placeholder="email: "
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            addNewAccount();
                        }}
                        >Add</button>
                    </Modal.Footer>
                </Modal>
                { currentUser && currentUser.role === 'admin' && (
                    <div>
                        <div className="card m-2" style={{width: "100%"}}>
                            <button className="btn btn-primary" onClick={ () => handleShow() }>Add Account</button>
                            <div className="card-body">
                                <h5 className="card-title">User List</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Only admin can get access to this user list.</h6>
                                <p className="card-text">
                                    <ul className="list-group">
                                        {
                                            users.map(u => {
                                                return (
                                                    <Link to={`/profile/${u.id}`} style={{textDecoration: "none", color: '#7074C2'}}>
                                                        <li className="list-group-item d-flex justify-content-between list-group-item-primary align-items-center">
                                                            {(u.firstName || '') + " " + (u.lastName || '')}
                                                            <small>
                                                                <button className="btn btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
                                                            </small>
                                                        </li>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
            <div className="col-md-5">
                {!visitor && userId &&
                    <div>
                        <div>
                            <h2>Followers</h2>
                            <ul className="list-group w-50">
                                {followers.length > 0 && followers.map((follower) => {
                                    return (
                                        <Link
                                            key={follower.id}
                                            to={`/profile/${follower.id}`}
                                            className="list-group-item list-group-item-action"
                                        >
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{follower.firstName || '' + " " + follower.lastName || ''}</h5>
                                                <small>{follower.role || ''}</small>
                                            </div>
                                            <p className="mb-1">{follower.desc || ''}</p>
                                            <small>{follower.location || ''}</small>
                                        </Link>
                                    )}
                                )}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;