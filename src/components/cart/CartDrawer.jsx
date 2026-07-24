import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        setShowCheckoutModal(false);
        setShowSuccessModal(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {}
      <div className="cart-overlay active" onClick={onClose} />

      {}
      <div className="cart-drawer active">
        {}
        <div className="cart-drawer-header">
          <div className="cart-header-left">
            <h3>Shopping Bag</h3>
            <span className="cart-count-pill">{cart.length}</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close drawer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon-wrapper">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary-olive)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="8" width="14" height="13" rx="3" />
                  <path d="M9 8a3 3 0 0 1 6 0" />
                  <path d="M9 17V12l6 4v-5" />
                </svg>
              </div>
              <h4>Your cart is empty</h4>
              <p>Add products to your cart and make them yours.</p>
              <button className="cart-continue-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-wrapper">
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card-wrapper">
                    <div className="cart-item-card">
                      <div className="cart-item-image-box">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                          }}
                        />
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-title-row">
                          <h5>{item.name}</h5>
                          <button
                            className="cart-item-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <span className="cart-item-price">${item.price}</span>
                        <div className="cart-item-actions">
                          <div className="cart-qty-selector">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-divider" />
                  </div>
                ))}
              </div>

              {}
              <div className="cart-drawer-footer">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span className="cart-summary-price">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-shipping-notice">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span>You qualify for <strong>Free Shipping</strong>!</span>
                </div>
                <button
                  className="cart-checkout-btn"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Proceed to Checkout
                </button>
                <button className="cart-clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {}
      {showCheckoutModal && (
        <>
          <div className="checkout-modal-overlay" onClick={() => setShowCheckoutModal(false)} />
          <div className="checkout-modal">
            <div className="checkout-modal-header">
              <h4>Confirm Your Order?</h4>
              <button
                className="checkout-modal-close"
                onClick={() => setShowCheckoutModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="checkout-modal-body">
              <div className="checkout-demo-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary-olive)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p>Are you sure you want to place this order?</p>
            </div>
            <div className="checkout-modal-footer">
              <button
                className="checkout-modal-continue-btn"
                onClick={() => {
                  setShowCheckoutModal(false);
                  setShowSuccessModal(true);
                }}
              >
                Yes, Proceed
              </button>
              <button
                className="checkout-modal-close-btn"
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {}
      {showSuccessModal && (
        <>
          <div className="checkout-modal-overlay" onClick={() => {
            setShowSuccessModal(false);
            clearCart();
            onClose();
          }} />
          <div className="checkout-modal">
            <div className="checkout-modal-header" style={{ justifyContent: "center" }}>
              <h4 style={{ textAlign: "center" }}>Order Placed Successfully!</h4>
            </div>
            <div className="checkout-modal-body">
              <div className="checkout-success-icon-wrapper">
                <div className="checkout-success-check-circle">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary-olive)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <p style={{ fontWeight: "600", color: "var(--text-main)", marginBottom: "8px" }}>
                Thank you for shopping with Nexus Store.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Your order has been received successfully.
              </p>
            </div>
            <div className="checkout-modal-footer">
              <button
                className="checkout-modal-continue-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  clearCart();
                  onClose();
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDrawer;
