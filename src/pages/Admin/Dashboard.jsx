import React from "react";
import { useLocation } from "react-router-dom";
import DashboardStats from "./DashboardStats";
import ProductManagement from "./ProductManagement";
import InventoryManagement from "./InventoryManagement";
import OrderManagement from "./OrderManagement";

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "dashboard";

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "orders":
        return <OrderManagement />;
      case "dashboard":
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      {renderTabContent()}
    </div>
  );
};

export default Dashboard;
