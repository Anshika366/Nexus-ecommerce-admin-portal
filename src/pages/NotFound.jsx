import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <h1 style={{ fontSize: "3rem", color: "#ef4444" }}>
        404 - Page Not Found
      </h1>
      <p style={{ margin: "1rem 0 2rem", color: "#64748b" }}>
        The page or product you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          background: "#0284c7",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Return to Storefront
      </Link>
    </div>
  );
};

export default NotFound;
