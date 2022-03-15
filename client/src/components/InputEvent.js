import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
//import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

const InputEvent = () => {
    // Event
    const [userId, setUserId] = useState("");
    const [taskId, setTaskId] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    // modal - event creation
    const [showEvent, setShowEvent] = useState(false);
    const handleCloseEvent = () => setShowEvent(false);
    const handleShowEvent = () => setShowEvent(true);

    // module colours dropbox
    const colourData = [
        { value: "Red", label: "Red" },
        { value: "Green", label: "Green" },
        { value: "Blue", label: "Blue" },
        { value: "Yellow", label: "Yellow" }
    ];

    // get modules for task module name dropbox
    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            setModule(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // used to update the state of module
    // whenever a new option is selected from the dropdown
    let handleModuleChange = (e) => {
        setModuleID(e.target.value)
    }

    // module post call
    const onSubmitEventForm = async (e) => {
        e.preventDefault();
        try {
            const body = { userId, taskId, title, start, end };
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.jwt_token);
            const response = await fetch("http://localhost:5000/events", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            window.location = "/tasks";
        } catch (err) {
            console.log(err.message)
        }
        getModules();
    };

    return (
        <Fragment>
            <button className="btn btn-success mt-2 me-2 ml-3" onClick={handleShowTask}>Create Task</button>
            <button className="btn btn-success mt-2 me-1" onClick={handleShowModule}>Create Module</button>
            {/* task modal */}
            <Modal show={showTask} onHide={handleCloseTask}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="text-center mt-3" onSubmit={onSubmitTaskForm}>
                        <label for="module_name">Module Name</label>
                        <select className="form-control" onChange={handleModuleChange}>
                            <option value="⬇️ Select a Module ⬇️"> -- Select a Module -- </option>
                            {modules.map((module) => <option value={module.module_id}>{module.module_name}</option>)}
                        </select>
                        <label for="description">Task Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}>
                        </input>
                        <label for="deadline">Due Date</label>
                        <Form.Control type="date" name='deadline' value={deadline}
                            onChange={e => setDeadline(e.target.value)} />
                        <label for="priority">Priority</label>
                        <select defaultValue="Medium" className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <label for="caValue">CA Value</label>
                        <input
                            type="text"
                            className="form-control"
                            value={caValue}
                            onChange={e => setCAValue(e.target.value)}>
                        </input>
                        <button className="btn btn-success mt-2">Add Task</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* module modal */}
            <Modal show={showModule} onHide={handleCloseModule}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="text-center mt-3" onSubmit={onSubmitModuleForm}>
                        <label for="module_name">Module Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={module_name}
                            onChange={e => setModuleName(e.target.value)}>
                        </input>
                        <label for="ca_total">CA Total</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ca_total}
                            onChange={e => setCATotalValue(e.target.value)}>
                        </input>
                        <label for="module_colour">Module Colour</label>
                        <select className="form-control" value={module_colour} onChange={e => setModuleColour(e.target.value)}>
                            {colourData.map(colour => <option value={colour.value}>{colour.label}</option>)}
                        </select>
                        <button className="btn btn-success mt-2">Add Module</button>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};




export default InputEvent;