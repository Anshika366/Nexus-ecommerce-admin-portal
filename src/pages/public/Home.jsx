import React, { useState, useMemo } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const { products } = useLoaderData();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  // Simple Debounce / Filter Logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1>Storefront Catalog</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            width: "260px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#fff",
              padding: "1rem",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ marginTop: "0.75rem" }}>{product.name}</h3>
            <p
              style={{
                color: "#059669",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              ${product.price}
            </p>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.9rem",
                margin: "0.5rem 0 1rem",
              }}
            >
              {product.description}
            </p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link
                to={`/product/${product.id}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#f1f5f9",
                  color: "#334155",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Details
              </Link>
              <button
                onClick={() => addToCart(product)}
                style={{
                  flex: 1,
                  background: "#0284c7",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
