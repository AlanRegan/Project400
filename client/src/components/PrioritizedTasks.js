import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader }
    from 'mdb-react-ui-kit';
import { AiFillFire } from 'react-icons/ai';
import { IoPersonAdd, IoTerminalSharp } from 'react-icons/io5';
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


const PrioritizedTasks = (setAuth) => {
    const [highPriorityTasks, setHighPriorityTasks] = useState([]);
    const [dueSoonTasks, setDueSoonTasks] = useState([]);
    const [allModules, setAllModules] = useState([]);


    const [leaderboard, setLeaderboard] = useState([]);
    const [friend_id, setFriendUserID] = useState("");
    // modal - add user
    const [showAddUser, setShowAddUser] = useState(false);
    const handleCloseAddUser = () => setShowAddUser(false);
    const handleShowAddUser = () => setShowAddUser(true);

    const [name, setName] = useState("");

    const logout = async e => {
        e.preventDefault();
        try {
          localStorage.removeItem("jwt_token");
          setAuth(false);
          toast.success("Logout successfully");
        } catch (err) {
          console.error(err.message);
        }
      };

      const getProfile = async () => {
        try {
          const res = await fetch("http://localhost:5000/dash", {
            method: "GET",
            headers: { jwt_token: localStorage.jwt_token }
          });
    
          const parseData = await res.json();
          setName(parseData.name);
        } catch (err) {
          console.error("o");
        }
      };
    
      useEffect(() => {
        getProfile();
      }, []);

    const getPrioritizedTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks/highpriority",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            setHighPriorityTasks(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    const getTasksDueSoon = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks/soon",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            const jsonArray = [jsonData]
            jsonArray.sort()
            setDueSoonTasks(jsonData);
            var result = jsonData.filter(obj => obj.daysLeft > 0 && obj.daysLeft <= 7);

        } catch (err) {
            console.error(err.message)
        }
        console.log(result);
    };

    const getLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:5000/friends",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            const lol = [jsonData]
            lol.sort()
            setLeaderboard(jsonData);
            var result = jsonData.filter(obj => obj.daysLeft > 0 && obj.daysLeft <= 7);

        } catch (err) {
            console.error(err.message)
        }
        console.log(result);
    };

    const getModules = async () => {
        try {
            const response = await fetch("http://localhost:5000/modules",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            setAllModules(jsonData);
        } catch (err) {
            console.error(err.message)
        }
        // console.log(result);
    };


        // module post call
        const onSubmitAddUserForm = async (e) => {
            e.preventDefault();
            try {
                const body = { friend_id };
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("jwt_token", localStorage.jwt_token);
                const response = await fetch("http://localhost:5000/friends", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body)
                });
                window.location = "/tasks";
            } catch (err) {
                console.log(err.message)
            }
        };

    useEffect(() => {
        getPrioritizedTasks();
        getTasksDueSoon();
        getModules();
        getLeaderboard();
    }, []);

    return (
            <div class="row">
                <div class="col-md-8 mb-3 mt-4">
                    <div class="page-content page-container" id="page-content">
                            <div class="row container d-flex justify-content-center">
                                <div class=" grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">High Priority Tasks</h4>
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Task</th>
                                                            <th>Module</th>
                                                            <th>Due In</th>
                                                            <th>CA Worth</th>
                                                            <th>Priority</th>
                                                        </tr>
                                                    </thead>
                                                    {highPriorityTasks.map(task => (
                                                        <tbody>
                                                            <tr>
                                                                <td>{task.description}</td>
                                                                <td>{task.module_name}</td>
                                                                <td>{task.daysLeft} Days</td>
                                                                <td>{task.cavalue}%</td>
                                                                <td><h5 className={task.priority}><AiFillFire /></h5></td>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                </div>
                <div class="col-md-4 mt-4">
                    <div class="">
                        <div class="container">
                            <h5 className="text-center">Modules</h5>
                            <div class="row hidden-md-up">
                                {allModules.map(module => (
                                    <div class="col-md-6 mb-4">
                                        <div className={`card rounded mb-2 border ${module.module_colour}`}>
                                            <br></br>                                            
                                            <h1 className={`card-title text-center ${module.module_colour}`}>{module.module_name}</h1>
                                            <br></br>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="page-content page-container" id="page-content">
                            <div class="row container d-flex justify-content-center">
                                <div class="grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Tasks Due Soon</h4>
                                            <div class="table-responsive">

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Task</th>
                                                            <th>Module</th>
                                                            <th>Due In</th>
                                                            <th>CA Worth</th>
                                                            <th>Priority</th>
                                                        </tr>
                                                    </thead>
                                                    {dueSoonTasks.map(task => (
                                                        <tbody>
                                                            <tr>
                                                                <td>{task.description}</td>
                                                                <td>{task.module_name}</td>
                                                                <td>{task.daysLeft} Days</td>
                                                                <td>{task.cavalue}%</td>
                                                                <td><h5 className={task.priority}><AiFillFire /></h5></td>

                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="page-content page-container" id="page-content">
                            <div class="row container d-flex justify-content-center">
                                <div class="grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title text-center">Leaderboard<button className="bg-transparent border-0 float-right ms-2" onClick={handleShowAddUser}><IoPersonAdd color="green" size={20} /></button></h4>
                                            <div class="table-responsive">

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>User</th>
                                                            <th>Score</th>
                                                        </tr>
                                                    </thead>
                                                    {leaderboard.map(user => (
                                                        <tbody>
                                                            <tr>
                                                                <td>{user.name}</td>
                                                                <td>{user.sum}</td>
                                                            </tr>
                                                        </tbody>
                                                    ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>

                    {/* module modal */}
            <Modal show={showAddUser} onHide={handleCloseAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label for="user_id">User ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={dueSoonTasks[0]?.user_id}
                            onChange={e => setFriendUserID(e.target.value)}
                            readOnly>
                        </input>
                    <form className="mt-3" onSubmit={onSubmitAddUserForm}>
                        <label for="user_id">Friend ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={friend_id}
                            onChange={e => setFriendUserID(e.target.value)}>
                        </input>
                        <button className="btn btn-success mt-2">Add User</button>
                    </form>
                </Modal.Body>
            </Modal>
            </div>
    );
};

export default PrioritizedTasks;