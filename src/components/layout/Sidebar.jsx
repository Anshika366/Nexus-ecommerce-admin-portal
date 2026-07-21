import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "240px",
        background: "#1e293b",
        color: "#fff",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h3 style={{ color: "#38bdf8", marginBottom: "1rem" }}>Admin Portal</h3>
      <NavLink
        to="/admin"
        end
        style={({ isActive }) => ({
          color: isActive ? "#38bdf8" : "#cbd5e1",
          textDecoration: "none",
          padding: "0.5rem",
          borderRadius: "4px",
        })}
      >
        📦 Inventory Management
      </NavLink>
      <NavLink
        to="/admin/add-product"
        style={({ isActive }) => ({
          color: isActive ? "#38bdf8" : "#cbd5e1",
          textDecoration: "none",
          padding: "0.5rem",
          borderRadius: "4px",
        })}
      >
        ➕ Add New Product
      </NavLink>
      <NavLink
        to="/"
        style={{
          color: "#94a3b8",
          textDecoration: "none",
          marginTop: "auto",
          padding: "0.5rem",
        }}
      >
        ⬅️ Back to Storefront
      </NavLink>
    </aside>
  );
};

export default Sidebar;
