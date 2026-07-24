import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout-container">
      <Sidebar />
      <div className="admin-layout-content">
        <main className="admin-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
