import React from "react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        marginBottom: "1rem",
        background: "rgba(30, 41, 59, 0.5)",
        borderRadius: "14px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}>
          {item.name}
        </h4>
        <p
          style={{
            color: "#38bdf8",
            fontWeight: "800",
            fontSize: "0.9rem",
            margin: "0.2rem 0",
          }}
        >
          ${item.price}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginTop: "0.4rem",
          }}
        >
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <span style={{ fontWeight: "700", fontSize: "0.85rem" }}>
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          background: "none",
          border: "none",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: "600",
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
