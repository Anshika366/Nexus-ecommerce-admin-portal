import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const ProductDetail = () => {
  const { product } = useLoaderData();

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Link to="/" style={{ color: "#0284c7", textDecoration: "none" }}>
        ← Back to Storefront
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <div>
          <h2>{product.name}</h2>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#059669",
              fontWeight: "bold",
              margin: "0.5rem 0",
            }}
          >
            ${product.price}
          </p>
          <p style={{ color: "#64748b" }}>{product.description}</p>
          <p style={{ marginTop: "1rem" }}>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Stock Available:</strong> {product.stock} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
