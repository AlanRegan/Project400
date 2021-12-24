import React from "react";
import InputTask from "../components/InputTask";
import ListTasks from "../components/ListTasks";

export const Tasks = () => {
return (
    <div className="container">

	{/* <div className="tasks"> */}
        <InputTask></InputTask>
<ListTasks></ListTasks>

	</div>
    // </div>
);
};
export default Tasks;
