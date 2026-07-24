import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="shopmate-footer">
      <div className="shopmate-footer-container">
        {}
        <div className="shopmate-footer-col brand-col">
          <div className="shopmate-footer-logo">
            <span className="shopmate-logo-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="8" width="14" height="13" rx="3" stroke="#111827" strokeWidth="2.2" />
                <path d="M9 8a3 3 0 0 1 6 0" stroke="#111827" strokeWidth="2.2" />
                <path d="M9 17V12l6 4v-5" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="shopmate-logo-text" style={{ color: "#111827" }}>
              Nexus<span className="nexus-brand-highlight" style={{ color: "#111827" }}>Store</span>
            </span>
          </div>
          <p className="shopmate-footer-desc">
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        {}
        <div className="shopmate-footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
        </div>

        {}
        <div className="shopmate-footer-col">
          <h4>Customer Service</h4>
          <Link to="/track-order">Track Order</Link>
          <Link to="/returns">Returns & Refunds</Link>
          <Link to="/shipping">Shipping Policy</Link>
        </div>

        {}
        <div className="shopmate-footer-col newsletter-col">
          <h4>Subscribe to our newsletter</h4>
          <p className="shopmate-newsletter-sub">
            Get the latest updates on new products and upcoming sales.
          </p>
          <div className="shopmate-newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="shopmate-footer-bottom">
        <div className="shopmate-footer-bottom-container">
          <p className="shopmate-footer-copyright">© 2026 Nexus Store. All Rights Reserved.</p>
          <div className="shopmate-footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-link-separator">|</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="footer-link-separator">|</span>
            <Link to="/cookies">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
