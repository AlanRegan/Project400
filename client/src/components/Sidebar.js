import React from 'react';
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


const Sidebar = () => {
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
                  </CDBSidebarMenu>
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


