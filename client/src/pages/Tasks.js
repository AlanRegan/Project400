import React from "react";
import InputTask from "../components/InputTask";
import ListTasks from "../components/ListTasks";

export const Tasks = () => {
    return (
        <div className="container">
            <InputTask></InputTask>
            <ListTasks></ListTasks>
        </div>
    );
};
export default Tasks;
