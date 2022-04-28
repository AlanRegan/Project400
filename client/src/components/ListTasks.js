import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader }
    from 'mdb-react-ui-kit';
import { AiFillFire, AiFillCheckCircle } from 'react-icons/ai';
import { CDBNavItem } from "cdbreact";
import toast, { Toaster } from 'react-hot-toast';
import InputTask from "../components/InputTask";
import EditTask from "../components/EditTask";
import { baseURL } from "../api/api-routes";

const ListTasks = ({ task }) => {
    const [tasks, setTasks] = useState([]);
    // for task complete status
    const [completeStatus, setCompleteStatus] = useState("");
    // filter tasks
    const [filteredTasks, setfilteredTasks] = useState(null);
    // filter tasks by priority
    var HighPriority = tasks.filter(e => e.priority === "High");
    var MediumPriority = tasks.filter(e => e.priority === "Medium");
    var LowPriority = tasks.filter(e => e.priority === "Low");
    // filter by days left
    var ThisWeek = tasks.filter(e => e.daysLeft < 7 && e.daysLeft > 0);
    var ThisMonth = tasks.filter(e => e.daysLeft <= 30 && e.daysLeft > 0);

    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch(baseURL + "/dash", {
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

    function showHighPriority() {
        setfilteredTasks(HighPriority);
    }
    function showMediumPriority() {
        setfilteredTasks(MediumPriority);
    }
    function showLowPriority() {
        setfilteredTasks(LowPriority);
    }

    function showThisWeek() {
        setfilteredTasks(ThisWeek);
    }
    function showThisMonth() {
        setfilteredTasks(ThisWeek);
    }

    const getTasks = async () => {
        try {
            const response = await fetch(baseURL + "/tasks",
                {
                    headers: { jwt_token: localStorage.jwt_token }
                });
            const jsonData = await response.json();
            setTasks(jsonData);
            setfilteredTasks(jsonData);
            for (var i = 0; i < jsonData.length; i += 1) {
                console.log(jsonData[i].outlet_name);
            }
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // task status put call
    const completeTask = async (e) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        try {
            const id = e.currentTarget.value;
            const body = { completeStatus: 'Complete' };
            const response = await fetch(baseURL + `/tasks/completetask/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            toast.success('Task Completed! Well done!', {
                position: "top-center"
            });
            getTasks();
        } catch (err) {
            console.log(err.message)
        }
    };

    return (
        <div>
            <InputTask></InputTask>

            <button className="btn bg-transparent mt-2 High" onClick={() => showHighPriority()}>
                <h5 className="High"><AiFillFire /></h5>
            </button>
            <button className="btn bg-transparent mt-2 Medium" onClick={() => showMediumPriority()}>
                <h5 className="Medium"><AiFillFire /></h5>
            </button>
            <button className="btn bg-transparent mt-2 Low" onClick={() => showLowPriority()}>
                <h5 className="Low"><AiFillFire /></h5>
            </button>

            <button className="btn bg-transparent mt-2 Low" onClick={() => showThisWeek()}>
                This Week
            </button>
            <button className="btn bg-transparent mt-2 Low" onClick={() => showThisMonth()}>
                This Month
            </button>

            <div className="row">
                {filteredTasks && filteredTasks.map((task) => (
                    <div className="mt-2 col col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12" key={task.task_id}>
                        <MDBCard className={`card rounded mb-2 border ${task.module_colour}`} shadow='1' background='white' style={{ maxWidth: '18rem' }}>
                            <MDBCardHeader border="1">{task.module_name}
                                <button className="bg-transparent border-0 float-right ms-2" value={task.task_id} onClick={completeTask}><AiFillCheckCircle color="green" size={20} /></button>
                                <EditTask task={task} />

                            </MDBCardHeader>
                            <MDBCardBody className='text-dark'>
                                {task.description}
                                {/* <MDBCardText> */}
                                <div className="row no-gutters mt-auto mb-2 justify-content-center">
                                    <div className="col-4 col-md-4 text-center">
                                        <br />Days Left
                                        <h5>{task.daysLeft}</h5>
                                    </div>
                                    <div className="col-4 col-md-4  text-center">
                                        <br />CA Value
                                        <h5>{task.cavalue}%</h5>
                                    </div>
                                    <div className="col-4 col-md-4  text-center">
                                        <br />Priority
                                        <h5 className={task.priority}><AiFillFire /></h5>
                                    </div>
                                </div>
                                {/* </MDBCardText> */}
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                ))
                }
            </div>
            <div><Toaster /></div>

        </div>
    );
};

export default ListTasks;