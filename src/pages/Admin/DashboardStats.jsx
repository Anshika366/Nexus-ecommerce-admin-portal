import React from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp, AlertCircle, Calendar } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,850.40",
      change: "+14.2% from last month",
      trend: "up",
      icon: <DollarSign size={20} style={{ color: "#4A5D4E" }} />,
      bg: "#DEEAE0",
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+8.3% from last week",
      trend: "up",
      icon: <ShoppingCart size={20} style={{ color: "#4B5563" }} />,
      bg: "#E5E7EB",
    },
    {
      title: "Active Users",
      value: "1,205",
      change: "+4.1% since yesterday",
      trend: "up",
      icon: <Users size={20} style={{ color: "#4B5563" }} />,
      bg: "#E5E7EB",
    },
    {
      title: "Conversion Rate",
      value: "2.42%",
      change: "-0.5% from last week",
      trend: "down",
      icon: <TrendingUp size={20} style={{ color: "#4B5563" }} />,
      bg: "#E5E7EB",
    },
  ];

  const recentOrders = [
    { id: "ORD-9281", customer: "Sarah K.", date: "July 24, 2026", total: "$120.50", status: "Completed" },
    { id: "ORD-9280", customer: "David L.", date: "July 24, 2026", total: "$89.99", status: "Processing" },
    { id: "ORD-9279", customer: "Elena R.", date: "July 23, 2026", total: "$240.00", status: "Shipped" },
  ];

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "Completed":
        return { background: "#DEEAE0", color: "#4A5D4E" };
      case "Processing":
        return { background: "#FEF3C7", color: "#92400E" };
      case "Shipped":
        return { background: "#EBF5FF", color: "#1E40AF" };
      default:
        return { background: "#E5E7EB", color: "#4B5563" };
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="admin-title" style={{ color: "#111827", margin: 0 }}>Dashboard Overview</h1>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "8px 0 0 0" }}>
          Monitor business performance, sales figures, and inventory metrics in real-time.
        </p>
      </div>

      {}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "4rem",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="admin-card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              overflow: "hidden",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>{stat.title}</span>
              <div
                style={{
                  background: stat.bg,
                  padding: "8px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#111827", margin: 0, letterSpacing: "-0.02em" }}>
                {stat.value}
              </h2>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: stat.trend === "up" ? "#4A5D4E" : "#991B1B",
                  fontWeight: "600",
                  margin: "6px 0 0 0",
                }}
              >
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "stretch" }}>
        {}
        <div
          className="admin-card"
          style={{
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#111827", margin: 0 }}>Recent Orders</h3>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Live View</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                <th style={{ padding: "12px 16px", fontSize: "0.82rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Order ID</th>
                <th style={{ padding: "12px 16px", fontSize: "0.82rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Customer</th>
                <th style={{ padding: "12px 16px", fontSize: "0.82rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Date</th>
                <th style={{ padding: "12px 16px", fontSize: "0.82rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>Amount</th>
                <th style={{ padding: "12px 16px", fontSize: "0.82rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord, idx) => (
                <tr key={idx} style={{ borderBottom: idx === recentOrders.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px 16px", fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-olive)" }}>{ord.id}</td>
                  <td style={{ padding: "16px 16px", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: "500" }}>{ord.customer}</td>
                  <td style={{ padding: "16px 16px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{ord.date}</td>
                  <td style={{ padding: "16px 16px", fontSize: "0.85rem", fontWeight: "700", color: "#111827" }}>{ord.total}</td>
                  <td style={{ padding: "16px 16px", fontSize: "0.82rem", textAlign: "right" }}>
                    <span
                      style={{
                        ...getStatusBadgeStyles(ord.status),
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontWeight: "700",
                        fontSize: "0.75rem",
                        display: "inline-block",
                      }}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {}
        <div
          className="admin-card"
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#111827", margin: 0 }}>System Notifications</h3>
          
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{ background: "#FEF2F2", padding: "8px", borderRadius: "10px", color: "#EF4444", display: "flex", alignItems: "center" }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "0.85rem", fontWeight: "700", color: "#111827" }}>Low Stock Alert</h4>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                3 products are currently under critical stock limits.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{ background: "#F4F7F4", padding: "8px", borderRadius: "10px", color: "#4A5D4E", display: "flex", alignItems: "center" }}>
              <Calendar size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "0.85rem", fontWeight: "700", color: "#111827" }}>Scheduled Backup</h4>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                System backup is scheduled for today at 23:59 UTC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
