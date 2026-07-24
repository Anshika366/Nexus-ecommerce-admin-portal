import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, updateProduct } from "../../api/productsApi";
import { Search, Package, AlertCircle, X, PlusCircle } from "lucide-react";

const InventoryManagement = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all"); 

  const [targetProduct, setTargetProduct] = useState(null);
  const [restockAmount, setRestockAmount] = useState("10");
  const [restockError, setRestockError] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setTargetProduct(null);
      setRestockAmount("10");
      setRestockError("");
    },
  });

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    setRestockError("");

    const amount = parseInt(restockAmount);
    if (isNaN(amount) || amount <= 0) {
      setRestockError("Restock amount must be a positive number.");
      return;
    }

    updateMutation.mutate({
      ...targetProduct,
      stock: targetProduct.stock + amount,
    });
  };

  const filteredProducts = products.filter((product) => {
    
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());

    let matchesStock = true;
    if (stockFilter === "low") {
      matchesStock = product.stock <= 10 && product.stock > 0;
    } else if (stockFilter === "out") {
      matchesStock = product.stock === 0;
    }

    return matchesSearch && matchesStock;
  });

  const getStockStatusBadge = (stock) => {
    if (stock === 0) {
      return (
        <span
          style={{
            background: "#FEE2E2",
            color: "#EF4444",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "0.78rem",
            fontWeight: "700",
            display: "inline-block",
          }}
        >
          Out of Stock
        </span>
      );
    }
    if (stock <= 10) {
      return (
        <span
          style={{
            background: "#FEF3C7",
            color: "#D97706",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "0.78rem",
            fontWeight: "700",
            display: "inline-block",
          }}
        >
          Low Stock
        </span>
      );
    }
    return (
      <span
        style={{
          background: "#DEEAE0",
          color: "#4A5D4E",
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: "0.78rem",
          fontWeight: "700",
          display: "inline-block",
        }}
      >
        In Stock
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="spinner"></div>
        <p>Loading inventory database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <AlertCircle size={40} color="#EF4444" />
        <h3>Failed to fetch inventory</h3>
        <p>There was an error loading the inventory data. Please try again.</p>
        <button onClick={() => queryClient.refetchQueries(["products"])} className="admin-primary-btn">
          Retry Fetch
        </button>
      </div>
    );
  }

  return (
    <div>
      {}
      <div className="admin-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <h1 className="admin-title" style={{ color: "#111827", margin: 0 }}>Stock & Supply Chain</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="admin-stats-pill">
            Total Operational Items: <strong>{products.length}</strong>
          </span>
        </div>
      </div>

      {}
      <div className="admin-toolbar-row" style={{ display: "flex", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div className="admin-search-wrapper" style={{ maxWidth: "400px", width: "100%", margin: 0 }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search inventory by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
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
          <option value="all">All Items</option>
          <option value="low">Low Stock Only (≤ 10)</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {}
      {filteredProducts.length === 0 ? (
        <div className="admin-empty-state">
          <Package size={48} className="empty-icon" />
          <h3>No products found</h3>
          <p>Try adjusting your search or selection criteria.</p>
        </div>
      ) : (
        <div className="admin-table-container admin-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Current Stock</th>
                <th>Stock Threshold</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-thumb"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                        }}
                      />
                      <span className="admin-product-name">{product.name}</span>
                    </div>
                  </td>
                  <td className="admin-price-cell" style={{ fontWeight: 700 }}>
                    <span style={{ color: product.stock <= 10 ? "#D97706" : "inherit" }}>
                      {product.stock} units
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontWeight: "500" }}>10 units</td>
                  <td>{getStockStatusBadge(product.stock)}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="admin-primary-btn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        fontSize: "0.82rem",
                        marginLeft: "auto",
                      }}
                      onClick={() => setTargetProduct(product)}
                      title="Restock Product"
                    >
                      <PlusCircle size={14} />
                      <span>Restock</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {targetProduct && (
        <div className="admin-modal-overlay" onClick={() => setTargetProduct(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
            <div className="modal-header">
              <h3>Restock Product Inventory</h3>
              <button className="modal-close-btn" onClick={() => setTargetProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRestockSubmit} className="modal-form">
              {restockError && <div className="modal-error-bar">⚠️ {restockError}</div>}
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FAF9F6",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.5rem",
                }}
              >
                <img
                  src={targetProduct.image}
                  alt={targetProduct.name}
                  style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700 }}>{targetProduct.name}</h4>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Current Stock: {targetProduct.stock} units</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="restock-amount">Quantity to Add *</label>
                <input
                  id="restock-amount"
                  type="number"
                  placeholder="e.g. 20"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setTargetProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-primary-btn"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Updating..." : "Add to Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
