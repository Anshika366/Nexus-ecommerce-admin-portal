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
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h3 className="admin-sidebar-title">Nexus Admin</h3>
        <p className="admin-sidebar-subtitle">Inventory Management</p>
      </div>

      <div className="admin-sidebar-links">
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
      </div>

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
