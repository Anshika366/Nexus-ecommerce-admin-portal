import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2>Inventory Management Dashboard</h2>
      <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
        Admin route protected via ProtectedRoute Guard.
      </p>
    </div>
  );
};

export default Dashboard;
