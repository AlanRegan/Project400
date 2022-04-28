import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListTasks from "./ListTasks";
import {baseURL} from '../api/api-routes'

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwt_token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error("log out error");
    }
  };
  
  const getProfile = async () => {
    try {
      const res = await fetch( baseURL +"/dash", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseData = await res.json();
      setName(parseData.name);
    } catch (err) {
      console.error("error getting profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  return (
      <Fragment>
        <h2>{name} 's Todo List</h2>
        
        <button onClick={e => logout(e)} className="btn btn-primary" style={{position: "absolute",right: "8rem"}}>
          Logout
        </button>
        </Fragment>
  );
};

export default Dashboard;