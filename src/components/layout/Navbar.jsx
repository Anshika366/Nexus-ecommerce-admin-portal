import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#0f172a",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#38bdf8",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        NEXUS STORE
      </Link>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <NavLink to="/" style={{ color: "#e2e8f0", textDecoration: "none" }}>
          Storefront
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink
              to="/admin"
              style={{ color: "#38bdf8", textDecoration: "none" }}
            >
              Admin Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            style={{ color: "#e2e8f0", textDecoration: "none" }}
          >
            Admin Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
