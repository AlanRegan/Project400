import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";

const InputTask = () => { 
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Low");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { description, deadline, priority };
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
    <h1 className="text-center mt-5">Tasks</h1>
    <form className="text-center mt-5" onSubmit={onSubmitForm}>
        <input 
        type="text" 
        className="form-control"
        value={description}
        onChange={e => setDescription(e.target.value)}>
        </input>
        <Form.Control type="date" name='deadline' value={deadline}
        onChange={e => setDeadline(e.target.value)}/>
        <select defaultValue="medium" className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
        <button className="btn btn-success">Add</button>
    </form>
    </Fragment>
    );
};

export default InputTask;