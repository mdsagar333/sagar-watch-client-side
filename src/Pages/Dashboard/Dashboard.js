import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
const Dashboard = () => {
  return (
    <div className="dashboard_container" style={{ height: "100vh" }}>
      <ProSidebar breakPoint="sm">
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>My Order</MenuItem>
          <MenuItem>All Order</MenuItem>
          <MenuItem>Review</MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Dashboard;
