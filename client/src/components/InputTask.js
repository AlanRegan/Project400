import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const InputTask = () => {
    // task
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Low");
    const [caValue, setCAValue] = useState("");
    // module
    const [module_name, setModuleName] = useState("");
    const [module_id, setModuleID] = useState("");
    const [ca_total, setCATotalValue] = useState("");
    const [modules, setModule] = useState([]);

    // get modules for task module name dropbox
    const getModules = async () => {
        try {
            const response = await fetch("http://localhost:5000/modules")
            const jsonData = await response.json();
            setModule(jsonData);
            for (var i = 0; i < jsonData.length; i += 1) {
                // console.log(jsonData[i].outlet_name);
            }
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getModules();
    }, []);

    // used to update the state of module
    // whenever a new option is selected from the dropdown
    let handleModuleChange = (e) => {
        setModuleID(e.target.value)
    }

    // module post call
    const onSubmitModuleForm = async (e) => {
        e.preventDefault();
        try {
            const body = { module_name, ca_total };
            const response = await fetch("http://localhost:5000/modules", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    };

    // task post call
    const onSubmitTaskForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description, deadline, priority, caValue, module_id };
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    };

    return (
        <Fragment>
            {/* module */}
            <h3 className="text-center mt-5">Create Module</h3>
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
            <button className="btn btn-success mt-2">Add Module</button>
            </form>
            {/* task */}
            <h3 className="text-center mt-5">Create Tasks</h3>
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
        </Fragment>
    );
};

export default InputTask;