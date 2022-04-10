import { React, Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader } 
from 'mdb-react-ui-kit';
import { AiFillFire } from 'react-icons/ai';
import { toast } from "react-toastify";
import { baseURL } from "../api/api-routes";

const ListModules = (setAuth) => {
    const [modules, setModules] = useState([]);
    const [moduleTasks, setModuleTasks] = useState([]);

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
          const res = await fetch( baseURL + "/dash", {
            method: "GET",
            headers: { jwt_token: localStorage.jwt_token }
          });
    
          const parseData = await res.json();
          setName(parseData.name);
        } catch (err) {
          console.error("o");
        }
      };
    
      useEffect(() => {
        getProfile();
      }, []);

    const getModules = async () => {
        try {
            const response = await fetch( baseURL+ "modules/modulesoverview",
            { headers: { jwt_token: localStorage.jwt_token }
        });
            const jsonData = await response.json();
            setModules(jsonData);
            console.log(jsonData)
            for (var i=0;i<jsonData.length;i+=1) {
                console.log(jsonData[i].outlet_name);
            }
        } catch (err) {
            console.error(err.message)
        }
    };

        // task status put call
        const getModuleTasks = async (e) => {
            e.preventDefault();
            console.log(e.currentTarget.value);
            try {
                const id = e.currentTarget.value;
                const response = await fetch( baseURL+ `/modules/${id}`,
                { headers: { jwt_token: localStorage.jwt_token }
            });
                const jsonData = await response.json();
                setModuleTasks(jsonData);
            } catch (err) {
                console.log(err.message)
            }
        };

    useEffect(() => {
        getModules();
        getModuleTasks();
    }, []);

    return ( 
    <Fragment>
            <div className="row">
                {modules.map(module => (
                    <div className="mt-2 col col-md-4" key={module.module_id}>
                                    <button className={`card rounded mb-2 border ${module.module_colour}`} value={module.module_id} onClick={getModuleTasks}>

                        <MDBCard className={`card rounded mb-2 border ${module.module_colour}`} background='white'>
                            <MDBCardHeader>{module.module_name}</MDBCardHeader>
                            <MDBCardBody className='text-dark'>
                                    <div className="row mt-auto mb-2 justify-content-center">
                                        <div className="col-12 text-center">
                                            <br/>CA Total
                                            <h5>{module.ca_total}%</h5>
                                        </div>
                                        <div className="col-6 text-center">
                                            <br/>Completed
                                            <h5>{module.currentlycompleted}%</h5>
                                        </div>
                                        <div className="col-6 text-center">
                                            <br/>Current Grade
                                            <h5>{module.grade}%</h5>
                                            </div>
                                            </div>
                            </MDBCardBody>
                        </MDBCard>
                            </button>
                    </div>
                ))}
            </div>
        </Fragment>
);
};

export default ListModules;