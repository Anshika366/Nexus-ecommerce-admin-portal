import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Search } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { isAdmin, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollToSection: sectionId } });
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="nexus-navbar">
        <div className="nexus-nav-container">
          <Link to="/" className="nexus-brand" onClick={() => setIsMobileMenuOpen(false)}>
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
            <Link to="/" className="nav-link">
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
            <Search className="search-icon" size={16} color="#64748B" onClick={handleSearchClick} style={{ cursor: "pointer" }} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <div className="nexus-actions">
            <Link to="/wishlist" className="nexus-action-btn wishlist-icon-btn">
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
              <span className="btn-label">Wishlist</span>
              <span className="nexus-blue-badge">{wishlist.length}</span>
            </Link>

            <button
              className="nexus-action-btn"
              onClick={() => {
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
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
              <span className="btn-label">Cart</span>
              <span className="nexus-blue-badge">{totalItems}</span>
            </button>

            {isAdmin ? (
              <div className="admin-actions-group">
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="nexus-login-btn admin-btn"
                  style={{ background: "var(--primary-olive)" }}
                >
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="nexus-login-btn logout-btn"
                  style={{ background: "#E2E8F0", color: "#475569", border: "1px solid #CBD5E1" }}
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="nexus-login-btn login-icon-btn"
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

            <button
              className="nexus-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`nexus-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="nexus-mobile-search">
            <Search size={18} color="#64748B" onClick={handleSearchClick} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <div className="nexus-mobile-nav-links">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <a href="#products" className="nav-link" onClick={(e) => handleNavClick(e, "products")}>
              Shop Products
            </a>
            <a href="#categories" className="nav-link" onClick={(e) => handleNavClick(e, "categories")}>
              Product Categories
            </a>
            <Link to="/wishlist" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              My Wishlist ({wishlist.length})
            </Link>
          </div>

          <div className="nexus-mobile-actions">
            {isAdmin ? (
              <>
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="nexus-login-btn"
                  style={{ background: "var(--primary-olive)", width: "100%", padding: "14px" }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="nexus-login-btn"
                  style={{ background: "#E2E8F0", color: "#475569", border: "1px solid #CBD5E1", width: "100%", padding: "14px" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="nexus-login-btn"
                style={{ width: "100%", padding: "14px", justifyContent: "center" }}
              >
                Login
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
