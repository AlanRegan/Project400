import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader }
    from 'mdb-react-ui-kit';
import { AiFillFire } from 'react-icons/ai';

const PrioritizedTasks = () => {
    const [highPriorityTasks, setHighPriorityTasks] = useState([]);
    const [dueSoonTasks, setDueSoonTasks] = useState([]);
    const [allModules, setAllModules] = useState([]);



    const getPrioritizedTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks/highpriority")
            const jsonData = await response.json();
            setHighPriorityTasks(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    const getTasksDueSoon = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks")
            const jsonData = await response.json();
            setDueSoonTasks(jsonData);
            var result = jsonData.filter(obj => obj.daysLeft > 0 && obj.daysLeft <= 7);

        } catch (err) {
            console.error(err.message)
        }
        console.log(result);
    };

    const getModules = async () => {
        try {
            const response = await fetch("http://localhost:5000/modules")
            const jsonData = await response.json();
            setAllModules(jsonData);
        } catch (err) {
            console.error(err.message)
        }
        // console.log(result);
    };

    useEffect(() => {
        getPrioritizedTasks();
        getTasksDueSoon();
        getModules();
    }, []);

    return (
        <Fragment>
            <div class="row mt-5">
                <div class="col-md-8">
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
                <div class="col-md-4">
                    <div class="py-5 float-right">
                        <div class="container">
                            <h5 className="text-center">Modules</h5>
                            <div class="row hidden-md-up">
                                {allModules.map(module => (
                                    <div class="col-md-6 mb-4">
                                        <div className={`card rounded mb-2 border ${module.module_colour}`}>
                                            <h4 class="card-title text-center">{module.module_name}</h4>
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
            </div>
        </Fragment>
    );
};

export default PrioritizedTasks;