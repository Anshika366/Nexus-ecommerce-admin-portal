import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
