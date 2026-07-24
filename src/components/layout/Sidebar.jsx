import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, ShoppingBag, ClipboardList, LogOut } from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "dashboard";

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const isLinkActive = (tabName, isDashboardDefault = false) => {
    return isDashboardDefault
      ? (activeTab === "dashboard" && location.pathname.startsWith("/admin"))
      : (activeTab === tabName);
  };

  return (
    <aside
      style={{
        width: "280px",
        background: "#F4F7F4",
        borderRight: "1px solid var(--border-color)",
        color: "var(--text-main)",
        padding: "2.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        height: "100vh",
        position: "sticky",
        top: 0,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.01)",
      }}
    >
      <div style={{ padding: "0.5rem 1.5rem 2.5rem 1.5rem" }}>
        <h3
          style={{
            color: "var(--accent-olive)",
            fontSize: "1.45rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Nexus Admin
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "8px 0 0 0", fontWeight: "500" }}>
          Inventory Management
        </p>
      </div>

      <Link
        to="/admin"
        className={`sidebar-link ${isLinkActive("dashboard", true) ? "active" : ""}`}
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/admin?tab=products"
        className={`sidebar-link ${isLinkActive("products") ? "active" : ""}`}
      >
        <ShoppingBag size={18} />
        <span>Products</span>
      </Link>

      <Link
        to="/admin?tab=inventory"
        className={`sidebar-link ${isLinkActive("inventory") ? "active" : ""}`}
      >
        <ClipboardList size={18} />
        <span>Inventory</span>
      </Link>

      <Link
        to="/admin?tab=orders"
        className={`sidebar-link ${isLinkActive("orders") ? "active" : ""}`}
      >
        <ClipboardList size={18} />
        <span>Orders</span>
      </Link>

      <a
        href="#logout"
        onClick={handleLogout}
        className="sidebar-logout"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </a>
    </aside>
  );
};

export default Sidebar;
