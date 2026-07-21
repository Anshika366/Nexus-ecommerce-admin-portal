import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1.5rem",
        background: "#0f172a",
        color: "#94a3b8",
        marginTop: "auto",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Nexus E-Commerce. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
