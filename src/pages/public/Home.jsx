import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const Home = () => {
  const { products } = useLoaderData();

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Storefront Catalog</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products?.map((product) => (
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
            <Link
              to={`/product/${product.id}`}
              style={{
                display: "inline-block",
                background: "#0284c7",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
