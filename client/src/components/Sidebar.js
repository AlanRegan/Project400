import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Home from '../pages/Home';
import { React, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { baseURL } from '../api/api-routes';


const Sidebar = ({ setAuth }) => {
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
      const res = await fetch(baseURL + "/dash", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseData = await res.json();
      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            PrioriTask
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>


            <NavLink exact to="/" element={<Home />}>
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tasks">
              <CDBSidebarMenuItem icon="table">Tasks</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/modules">
              <CDBSidebarMenuItem icon="user">Module Overview</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/grades">
              <CDBSidebarMenuItem icon="user">Grades</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/schedule">
              <CDBSidebarMenuItem icon="calendar-check">Scheduler</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <CDBSidebarMenuItem icon="arrow-right">
            <button onClick={e => logout(e)} className="btn btn-link ps-0" style={{ color: 'white' }}>
              Logout
            </button></CDBSidebarMenuItem>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Alan Regan
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;


