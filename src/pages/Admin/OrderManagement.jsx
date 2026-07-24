import React, { useState } from "react";
import { Search, Eye, Clipboard, X, ShoppingBag } from "lucide-react";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const orders = [
    {
      id: "ORD-9281",
      customer: "Sarah K.",
      email: "sarah.k@example.com",
      date: "July 24, 2026",
      total: 120.50,
      status: "Completed",
      items: [
        { name: "Amber Dropper Essential Oil", qty: 2, price: 29.99 },
        { name: "Luxury Organic Candle", qty: 1, price: 60.52 }
      ]
    },
    {
      id: "ORD-9280",
      customer: "David L.",
      email: "david.l@example.com",
      date: "July 24, 2026",
      total: 89.99,
      status: "Processing",
      items: [
        { name: "Luxury Bath Salts Pack", qty: 3, price: 29.99 }
      ]
    },
    {
      id: "ORD-9279",
      customer: "Elena R.",
      email: "elena.r@example.com",
      date: "July 23, 2026",
      total: 240.00,
      status: "Shipped",
      items: [
        { name: "Curved Creator Monitor", qty: 1, price: 240.00 }
      ]
    },
    {
      id: "ORD-9278",
      customer: "Marcus J.",
      email: "marcus.j@example.com",
      date: "July 22, 2026",
      total: 45.98,
      status: "Completed",
      items: [
        { name: "Minimalist Felt Desk Pad", qty: 2, price: 22.99 }
      ]
    },
    {
      id: "ORD-9277",
      customer: "Jessica W.",
      email: "jessica.w@example.com",
      date: "July 22, 2026",
      total: 189.99,
      status: "Shipped",
      items: [
        { name: "Custom Hot-Swap Mechanical Keyboard", qty: 1, price: 189.99 }
      ]
    },
    {
      id: "ORD-9276",
      customer: "Thomas B.",
      email: "thomas.b@example.com",
      date: "July 21, 2026",
      total: 512.40,
      status: "Completed",
      items: [
        { name: "Noise Cancelling ANC Headphones", qty: 2, price: 256.20 }
      ]
    }
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
    <div>
      {}
      <div className="admin-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div>
          <h1 className="admin-title" style={{ color: "#111827", margin: 0 }}>Customer Orders</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "8px 0 0 0" }}>
            Manage and track all store transactions.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="admin-stats-pill">
            Total Orders: <strong>{orders.length}</strong>
          </span>
        </div>
      </div>

      {}
      <div className="admin-toolbar-row" style={{ display: "flex", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div className="admin-search-wrapper" style={{ maxWidth: "400px", width: "100%", margin: 0 }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search orders by ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            outline: "none",
            fontSize: "0.9rem",
            background: "var(--white)",
            color: "var(--text-main)",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: "600",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-olive)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <option value="all">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>

      {}
      {filteredOrders.length === 0 ? (
        <div className="admin-empty-state">
          <Clipboard size={48} className="empty-icon" />
          <h3>No orders found</h3>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="admin-table-container admin-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700, color: "var(--accent-olive)" }}>{order.id}</td>
                  <td style={{ fontWeight: 600, color: "var(--text-main)" }}>{order.customer}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{order.date}</td>
                  <td style={{ fontWeight: 700, color: "var(--text-main)" }}>${order.total.toFixed(2)}</td>
                  <td>
                    <span
                      style={{
                        ...getStatusBadgeStyles(order.status),
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontWeight: "700",
                        fontSize: "0.78rem",
                        display: "inline-block",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="admin-edit-btn"
                      onClick={() => setSelectedOrder(order)}
                      title="View Details"
                      style={{ marginLeft: "auto" }}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <h3>Order details: {selectedOrder.id}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedOrder(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Customer Name: <strong style={{ color: "var(--text-main)" }}>{selectedOrder.customer}</strong>
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Email Address: <strong style={{ color: "var(--text-main)" }}>{selectedOrder.email}</strong>
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Order Date: <strong style={{ color: "var(--text-main)" }}>{selectedOrder.date}</strong>
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Status:</span>
                  <span
                    style={{
                      ...getStatusBadgeStyles(selectedOrder.status),
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: "700",
                      fontSize: "0.75rem",
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h4 style={{ margin: "0 0 12px 0", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-main)" }}>Items Purchased</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.85rem",
                        background: "#FAF9F6",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <ShoppingBag size={14} style={{ color: "var(--accent-olive)" }} />
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                      </div>
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.qty} x ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700, color: "var(--text-main)" }}>Order Total</span>
                <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--accent-olive)" }}>
                  ${selectedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="modal-actions-row" style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-color)" }}>
              <button
                type="button"
                className="modal-primary-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
