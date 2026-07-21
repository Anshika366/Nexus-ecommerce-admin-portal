import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            background: "#ffffff",
            padding: "1rem 2rem",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2>Nexus Management Console</h2>
        </header>
        <main style={{ padding: "2rem", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
