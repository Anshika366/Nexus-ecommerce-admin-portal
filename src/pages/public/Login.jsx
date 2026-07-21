import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = () => {
    localStorage.setItem("isAdmin", "true");
    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        textAlign: "center",
      }}
    >
      <h2>Admin Login Portal</h2>
      <p style={{ color: "#64748b", margin: "1rem 0 1.5rem" }}>
        Click below to simulate login with local storage auth guard flag.
      </p>
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "#0284c7",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Authenticate as Admin
      </button>
    </div>
  );
};

export default Login;
