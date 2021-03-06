import { React, Fragment, useState } from "react";
import { AiFillEdit } from 'react-icons/ai';
import Form from "react-bootstrap/Form";
import { baseURL } from "../api/api-routes";

const EditTask = ({ task }) => {
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [priority, setPriority] = useState(task.priority);
  const [cavalue, setCAValue] = useState(task.cavalue);

  //edit grade function

  const updateTask = async e => {
    e.preventDefault();
    try {
      const body = { task };
      const response = await fetch(baseURL +
        `/tasks/${task.task_id}`,
        {
          method: "PUT",
          headers: { jwt_token: localStorage.jwt_token },
          body: JSON.stringify(body)
        }
      );
    } catch (err) {
      console.error("Task update error");
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="bg-transparent border-0 float-right"
        data-toggle="modal"
        data-target={`#id${task.task_id}`}
      >
        <AiFillEdit color="blue" size={20} />
      </button>
      <div
        class="modal"
        id={`id${task.task_id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Task</h4>
            </div>

            <div class="modal-body">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={task.description}
                onChange={e => setDescription(e.target.value)}
              />
              <label className="pt-2">Deadline</label>
              <Form.Control type="date" name="date"
                onChange={e => setDeadline(e.target.value)} />
              <label className="pt-2">CA Value</label>
              <input
                type="text"
                className="form-control"
                value={task.cavalue}
                onChange={e => setCAValue(e.target.value)}
              />
              <label className="pt-2">Priority</label>
              <input
                type="text"
                className="form-control"
                value={task.priority}
                onChange={e => setPriority(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateTask(e)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTask;
