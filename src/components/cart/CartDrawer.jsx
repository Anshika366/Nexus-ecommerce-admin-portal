import React from "react";
import { useCart } from "../../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "380px",
        background: "#fff",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.2)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e2e8f0",
          pb: "1rem",
        }}
      >
        <h3>Your Shopping Cart</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", margin: "1rem 0" }}>
        {cart.length === 0 ? (
          <p
            style={{ color: "#64748b", textAlign: "center", marginTop: "2rem" }}
          >
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "0.95rem" }}>{item.name}</h4>
                <p style={{ color: "#059669", fontWeight: "bold" }}>
                  ${item.price}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: "0.1rem 0.5rem", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: "0.1rem 0.5rem", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ borderTop: "1px solid #e2e8f0", pt: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={clearCart}
            style={{
              width: "100%",
              background: "#64748b",
              color: "#fff",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "0.5rem",
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Checkout simulated!")}
            style={{
              width: "100%",
              background: "#059669",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
