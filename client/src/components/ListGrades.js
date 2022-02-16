import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader } 
from 'mdb-react-ui-kit';
import { AiFillFire, AiFillCheckCircle } from 'react-icons/ai';
import { CDBNavItem } from "cdbreact";
import toast, { Toaster } from 'react-hot-toast';
import InputTask from "../components/InputTask";
import Tasks from "../pages/Tasks";
import EditGrade from "./EditGrade";

const ListGrades = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/grades")
            const jsonData = await response.json();
            setCompletedTasks(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);
    
    return (
        <Fragment>
            {" "}
            <div class="row">
                <div class="col-md-8 mb-3 mt-4">
                    <div class="page-content page-container" id="page-content">
                            <div class="row container d-flex justify-content-center">
                                <div class=" grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            {/* <h4 class="card-title">Completed Tasks</h4> */}
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Task</th>
                                                            <th>CA Worth</th>
                                                            <th>Grade</th>
                                                            <th>Edit</th>

                                                        </tr>
                                                    </thead>
                                                        <tbody>
                                                    {completedTasks.map(task => (
                                                            <tr key={task.task_id}>
                                                                <td>{task.description}</td>
                                                                <td>{task.cavalue}%</td>
                                                                <td>{task.grade}%</td>
                                                                <td><EditGrade task={task} /></td>
                                                            </tr>
                                                    ))}
                                                        </tbody>
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

export default ListGrades;