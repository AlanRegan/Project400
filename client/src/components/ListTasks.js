import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader } 
from 'mdb-react-ui-kit';
const ListTasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks")
            const jsonData = await response.json();
            setTasks(jsonData);
            for (var i=0;i<jsonData.length;i+=1) {
                console.log(jsonData[i].outlet_name);
            }
            //console.log(jsonData);

        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    //console.log(tasks);
    // console.log("taskies" +tasks[1]?.deadline);
    // console.log(tasks[0]?.deadline.substring(0,10));

    //const dL = await tasks.deadline.substring(0,10);


    return ( 
    <Fragment>
        <h1 className="mt-3">All Tasks</h1>
            <div className="row">
                {tasks.map(task => (
                    <div className="mt-2 col col-md-3" key={task.task_id}>
                        <MDBCard shadow='0' border='dark' background='white' style={{ maxWidth: '18rem' }}>
                            <MDBCardHeader>{task.module_name}</MDBCardHeader>
                            <MDBCardBody className='text-dark'>
                                <MDBCardTitle>{task.description}</MDBCardTitle>
                                {/* <MDBCardText> */}
                                    <div className="row no-gutters mt-auto mb-2 justify-content-center">
                                        <div className="col-4 text-center">
                                            <br/>Days Left
                                            <h5>{task.daysLeft}</h5>
                                        </div>
                                        <div className="col-4 text-center">
                                            <br/>CA Value
                                            <h5>{task.cavalue}%</h5>
                                        </div>
                                        <div className="col-4 text-center">
                                            <br/>Priority
                                            <h5>{task.priority}</h5>
                                            </div>
                                            </div>
                                {/* </MDBCardText> */}                              
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                ))}
            </div>
        </Fragment>
);
};

export default ListTasks;