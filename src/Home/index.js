import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from './client'
import {useNavigate} from "react-router";
import Modal from 'react-bootstrap/Modal';
import {FaUserGroup} from "react-icons/fa6";
import {FaArrowRight, FaRegCommentDots, FaTasks, FaUserTie} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {CiSquarePlus} from "react-icons/ci";
import {SiMicrosoftteams} from "react-icons/si";

function Home() {
    const [recentUsers, setRecentUsers] = useState([]);
    const [team, setTeam] = useState({});
    const [newTeam, setNewTeam] = useState({});
    const [teams, setTeams] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const addTeam = async () => {
        await client.addTeam({ ...newTeam, id: new Date().getTime().toString() });
        setShow(false);
        window.location.reload();
    }
    const handleShow = () => {
        if (currentUser && currentUser.role === 'admin') {
            setShow(true);
        } else {
            alert("Only admin can add a new team!");
        }
    }

    const handleClick = (event) => {
        if (!JSON.parse(window.localStorage.getItem('user'))) {
            event.preventDefault();
            alert("You can not get access to the profile page unless logged in!");
        }
    }

    useEffect(() => {
        client.getTeams().then(res => setTeams(res));
        client.getRecentUsers().then(res => setRecentUsers(res));
        if (currentUser) {
            client.getMyTeam(currentUser.id).then(res => setTeam(res));
            client.getMyTasks(currentUser.id).then(res => setMyTasks(res));
            client.getMyComments(currentUser.id).then(res => setMyComments(res));
        }
    }, []);
    return (
        <div>
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
                        value={newTeam.name}
                        onChange={(e) => {setNewTeam({ ...newTeam, name: e.target.value })}}
                        placeholder="team name: "
                    />
                    <input
                        className="form-control m-2"
                        value={newTeam.description}
                        onChange={(e) => {setNewTeam({ ...newTeam, description: e.target.value })}}
                        placeholder="team description: "
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        addTeam();
                    }}
                    >Add</button>
                </Modal.Footer>
            </Modal>

            <div className="row">
                <div className="col-md-6">
                    <div className="card m-2" style={{width: "100%"}}>
                        <div className="card-body">
                            <h5 className="card-title"><FaUserGroup className="m-1"/> Project Teams</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Developer, Tester, and Product Manager Teams.</h6>
                            <p className="card-text">
                                <ul className="list-group">
                                    {
                                        teams.map(team => {
                                            return (
                                                <li className="list-group-item d-flex justify-content-between list-group-item-primary align-items-center">
                                                    {team.name || ''}
                                                    <small style={{color: "gray"}}>{team.description || ''}</small>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </p>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleShow();
                                }}
                                className="card-link btn btn-sm btn-primary m-1 float-end"
                            > <CiSquarePlus size={25} /> Add Team (Must login as admin) </button>
                        </div>
                    </div>

                    <div className="card m-2" style={{width: "100%"}}>
                        <div className="card-body">
                            <h5 className="card-title"><FaUserTie className="m-1"/> New Team Members</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Greeting to your new colleagues!</h6>
                            <p className="card-text">
                                <ul className="list-group">
                                    {
                                        recentUsers.map(u => {
                                            return (
                                                <Link to={`/profile/${u.id}`} style={{textDecoration: "none", color: '#7074C2'}}>
                                                    <li className="list-group-item d-flex justify-content-between list-group-item-secondary align-items-center">
                                                        {u.firstName || ''}
                                                        <small style={{color: "gray"}}>Email: {u.email || ''}</small>
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
                <div className="col-md-6">
                        <div className="card m-2" style={{width: "90%"}}>
                            <img
                                src="https://plus.unsplash.com/premium_photo-1661944456241-c920f93bd87b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="card-img-top"
                                style={{maxWidth: "20%", maxHeight: "20%", borderRadius: 5, margin: "5px 5px 5px 5px"}}
                            />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <Link
                                            to="/profile"
                                            style={{textDecoration: "none", fontSize: 30}}
                                            onClick={(e) => handleClick(e)}
                                        ><CgProfile className="m-1" /> My Profile</Link>
                                    </h5>
                                    <p className="card-text"></p>
                                    { currentUser && (
                                        <div>
                                            <p className="card-text"><strong>Name:</strong> {currentUser.firstName + " " + currentUser.lastName}</p>
                                            <p className="card-text"><strong>Role:</strong> {currentUser.role}</p>
                                            <p className="card-text"><strong>Team:</strong> {currentUser.team}</p>
                                            <p className="card-text"><strong>Location:</strong> {currentUser.location}</p>
                                            <button className="btn btn-primary" onClick={() => {
                                                navigate(`/profile/${currentUser.id}`)
                                            }}><FaArrowRight /> Go To Profile</button>
                                        </div>
                                    )}
                                    { !currentUser && (
                                        <div>
                                            <p className="card-text">You must
                                                <Link to={'/login'}  style={{textDecoration: "none"}}> login</Link> to see.
                                            </p>
                                        </div>
                                    )}
                                </div>
                        </div>
                        <div className="card m-2" style={{width: "90%"}}>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <SiMicrosoftteams /> My Team
                                </h4>
                                { currentUser && (
                                    <div>
                                        <p className="card-text"><strong>Name:</strong> {team.name || ''}</p>
                                        <p className="card-text"><strong>Team Intro:</strong> {team.description || ''}</p>
                                    </div>
                                )}
                                { !currentUser && (
                                    <div>
                                        <p className="card-text">You must
                                            <Link to={'/login'}  style={{textDecoration: "none"}}> login</Link> to see.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card m-2" style={{width: "90%"}}>
                            <div className="card-body">
                                <h4><FaTasks /> My Tasks</h4>
                                <p className="card-text">
                                    <ul className="list-group list-group-flush">
                                        { currentUser && (
                                            myTasks.map(task => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between list-group-item-warning">
                                                        {task.name || ''}
                                                        <small>{ task.status }</small>
                                                    </li>
                                                )
                                            })
                                        ) }
                                        { !currentUser && (
                                            <div>
                                                <p className="card-text">You must
                                                    <Link to={'/login'}  style={{textDecoration: "none"}}> login</Link> to see.
                                                </p>
                                            </div>
                                        )}
                                    </ul>
                                </p>
                            </div>
                        </div>
                        <div className="card m-2" style={{width: "90%"}}>
                            <div className="card-body">
                                <h4><FaRegCommentDots /> My Comments</h4>
                                <p className="card-text">
                                    <ul className="list-group list-group-flush">
                                        { currentUser && (
                                            myComments.map(comment => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between list-group-item-info">
                                                        {comment.content || ''}
                                                        <small>{ comment.created || '' }</small>
                                                    </li>
                                                )
                                            })
                                        ) }
                                        { !currentUser && (
                                            <div>
                                                <p className="card-text">You must
                                                    <Link to={'/login'}  style={{textDecoration: "none"}}> login</Link> to see.
                                                </p>
                                            </div>
                                        )}
                                    </ul>
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Home;