import { React, Fragment, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const EditGrade = ({ setAuth, task }) => {
  const [grade, setGrade] = useState(task.grade);

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
        console.log(parseData);
      } catch (err) {
        console.error("o");
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);

  //edit grade function

  const updateGrade = async e => {
    e.preventDefault();
    try {
      const body = { grade };
      const response = await fetch(
        `http://localhost:5000/grades/${task.task_id}`,
        {
          method: "PUT",
          headers: { jwt_token: localStorage.jwt_token,
            "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
        );
        window.location = "http://localhost:3000/grades";
        console.log(task.task_id);
    } catch (err) {
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${task.task_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${task.task_id}`}
        onClick={() => setGrade(task.grade)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Grade</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setGrade(task.grade)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={grade}
                onChange={e => setGrade(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateGrade(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setGrade(task.grade)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditGrade;
