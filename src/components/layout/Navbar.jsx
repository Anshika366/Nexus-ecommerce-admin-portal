import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { isAdmin, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollToSection: sectionId } });
    }
  };

  return (
    <>
      <header className="nexus-navbar">
        <div className="nexus-nav-container">
          <Link to="/" className="nexus-brand">
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
              <rect x="5" y="8" width="14" height="13" rx="3" stroke="var(--primary-olive)" strokeWidth="2.2" />
              <path d="M9 8a3 3 0 0 1 6 0" stroke="var(--primary-olive)" strokeWidth="2.2" />
              <path d="M9 17V12l6 4v-5" stroke="var(--primary-olive)" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span className="nexus-brand-text">
              Nexus<span className="nexus-brand-highlight">Store</span>
            </span>
          </Link>

          <nav className="nexus-nav-links">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <a href="#products" className="nav-link" onClick={(e) => handleNavClick(e, "products")}>
              Shop
            </a>
            <a href="#categories" className="nav-link categories-link" onClick={(e) => handleNavClick(e, "categories")}>
              Categories
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
          </nav>

          <div className="nexus-search-box">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search for products..." />
            <button className="search-filter-btn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </button>
          </div>

          <div className="nexus-actions">
            <Link to="/wishlist" className="nexus-action-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Wishlist</span>
              <span className="nexus-blue-badge">{wishlist.length}</span>
            </Link>

            <button
              className="nexus-action-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              <span className="nexus-blue-badge">{totalItems}</span>
            </button>

            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate("/admin")}
                  className="nexus-login-btn admin-btn"
                  style={{ background: "var(--primary-olive)" }}
                >
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="nexus-login-btn logout-btn"
                  style={{ background: "#E2E8F0", color: "#475569", border: "1px solid #CBD5E1" }}
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="nexus-login-btn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
