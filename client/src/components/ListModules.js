import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader } 
from 'mdb-react-ui-kit';
import { AiFillFire } from 'react-icons/ai';

const ListModules = () => {
    const [modules, setModules] = useState([]);

    const getModules = async () => {
        try {
            const response = await fetch("http://localhost:5000/modulesoverview")
            const jsonData = await response.json();
            setModules(jsonData);
            for (var i=0;i<jsonData.length;i+=1) {
                console.log(jsonData[i].outlet_name);
            }
            //console.log(jsonData);

        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getModules();
    }, []);

    return ( 
    <Fragment>
            <div className="row">
                {modules.map(module => (
                    <div className="mt-2 col col-md-4" key={module.module_id}>
                        <MDBCard shadow='0' border='dark' background='white' style={{  }}>
                            <MDBCardHeader>{module.module_name}</MDBCardHeader>
                            <MDBCardBody className='text-dark'>
                                {/* <MDBCardText> */}
                                    <div className="row no-gutters mt-auto mb-2 justify-content-center">
                                        <div className="col-3 text-center">
                                            <br/>CA Total
                                            <h5>{module.ca_total}</h5>
                                        </div>
                                        <div className="col-5 text-center">
                                            <br/>CA Completed
                                            <h5>{module.currentlycompleted}%</h5>
                                        </div>
                                        <div className="col-4 text-center">
                                            <br/>Current Grade
                                            {/* <h5 className={task.priority}><AiFillFire/></h5> */}
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

export default ListModules;