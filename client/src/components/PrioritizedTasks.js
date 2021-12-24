import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader } 
from 'mdb-react-ui-kit';
import { AiFillFire } from 'react-icons/ai';

const PrioritizedTasks = () => {
    const [highPriorityTasks, setHighPriorityTasks] = useState([]);

    const getPrioritizedTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks/highpriority")
            const jsonData = await response.json();
            setHighPriorityTasks(jsonData);
            for (var i=0;i<jsonData.length;i+=1) {
                console.log(jsonData[i].outlet_name);
            }
            //console.log(jsonData);

        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getPrioritizedTasks();
    }, []);

    return ( 
    <Fragment>
        {/* Added from prio table */}
         <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-lg-8 grid-margin stretch-card">
                {/* end of prio table centering divs */}

        {/* <h1 className="mt-3">Prioritized Tasks</h1> */}


           
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">High Priority Tasks</h4>
                        <div class="table-responsive">
                        
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Module</th>
                                        <th>Due In</th>
                                        <th>CA Worth</th>
                                        <th>Priority</th>
                                    </tr>
                                </thead>
                                {highPriorityTasks.map(task => (
                                <tbody>
                                    <tr>
                                        <td>{task.description}</td>
                                        <td>{task.module_name}</td>
                                        <td>{task.daysLeft} Days</td>
                                        <td>{task.cavalue}%</td>
                                        <td><h5 className={task.priority}><AiFillFire/></h5></td>

                                    </tr>                                    
                                </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Fragment>
);
};

export default PrioritizedTasks;