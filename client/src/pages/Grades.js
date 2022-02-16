import React, { Fragment } from "react";
import EditGrade from "../components/EditGrade";
import InputTask from "../components/InputTask";
import ListGrades from "../components/ListGrades";

export const Grades = () => {
    return (
        <Fragment>
            <ListGrades></ListGrades>
            {/* <EditGrade></EditGrade> */}
        </Fragment>
    );
};
export default Grades;