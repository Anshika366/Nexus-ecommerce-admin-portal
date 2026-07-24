import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  Heart,
  ShoppingCart,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/productsApi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products: initialProducts } = useLoaderData() || { products: [] };

  const { data: products = initialProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: initialProducts,
  });

  const bestSellingProducts = products.slice(0, 8);

  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const element = document.getElementById(location.state.scrollToSection);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const categories = [
    {
      id: 1,
      title: "Electronics",
      image:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80",
      bgColor: "#EEF5FF",
    },
    {
      id: 2,
      title: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FDEEEF",
    },
    {
      id: 3,
      title: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FFF8E5",
    },
    {
      id: 4,
      title: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F2EEFF",
    },
    {
      id: 5,
      title: "Sports",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
      bgColor: "#EEF8F7",
    },
    {
      id: 6,
      title: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FFF2E8",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Amazing products and fast delivery! Nexus Store is my go-to store.",
      name: "John D.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      text: "Great quality at affordable prices. Very happy.",
      name: "Sarah M.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      text: "Highly recommend Nexus Store to all my friends and family!",
      name: "Michael T.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <div className="home-container">
      <div className="hero-feature-bg-wrapper">
        <section className="home-hero-section">
          <div className="home-hero-wrapper">
            <div className="home-hero-left">
              <div className="home-badge-pill">
                <span className="home-badge-dot"></span> NEW ARRIVALS
              </div>
              <h1 className="home-hero-title">
                Discover The Best
                <br />
                Products for You
              </h1>
              <p className="home-hero-subtitle">
                Explore our wide range of high-quality products at affordable
                prices. Shop now and enjoy the best deals!
              </p>
              <div className="home-hero-cta">
                <button
                  className="home-btn-olive"
                  onClick={() => navigate("/shop")}
                >
                  Shop Now <ArrowRight size={18} />
                </button>
              </div>
              <div className="home-hero-trust">
                <div className="home-trust-avatars">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer 1" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Customer 2" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Customer 3" />
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Customer 4" />
                </div>
                <span className="home-trust-text">Trusted by 10,000+ Happy Customers</span>
              </div>
            </div>
            <div className="home-hero-right">
              <div className="home-hero-shapes">
                <div className="home-hero-shape shape-1"></div>
                <div className="home-hero-shape shape-2"></div>
              </div>
              <div className="home-hero-image-container">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium Retail Shopping Experience"
                  className="home-hero-image"
                />
              </div>
              <div className="home-floating-badge review-badge">
                <span className="badge-stars"><Star size={12} fill="var(--primary-olive)" stroke="none" /> 4.9</span>
                <span className="badge-text">(120+ reviews)</span>
              </div>
              <div className="home-floating-badge discount-badge">
                <span className="badge-percent">20% OFF</span>
                <span className="badge-tag">Discount</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-features-strip">
          <div className="home-features-grid">
            {[
              { icon: Truck, t: "Free Shipping", d: "On orders over $50" },
              { icon: Shield, t: "Secure Payment", d: "100% secure payment" },
              { icon: RotateCw, t: "Easy Returns", d: "30 days return policy" },
              { icon: Headphones, t: "24/7 Support", d: "Dedicated support" },
            ].map((item, i) => (
              <div key={i} className="home-feature-box">
                <div className="home-feature-icon">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="home-feature-heading">{item.t}</h4>
                  <p className="home-feature-desc">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {}
      <section className="home-section" id="categories">
        <div className="home-section-header">
          <h2 className="home-section-title">Shop by Categories</h2>
          <button className="home-section-viewall" onClick={() => navigate("/categories")}>
            View All Categories →
          </button>
        </div>
        <div className="home-category-circles-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="home-category-circle-card">
              <div
                className="home-circle-img-box"
                style={{ backgroundColor: cat.bgColor }}
              >
                <img src={cat.image} alt={cat.title} />
              </div>
              <span className="home-circle-title">{cat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="home-section" id="products">
        <div className="home-section-header">
          <h2 className="home-section-title">Best Selling Products</h2>
          <button className="home-section-viewall" onClick={() => navigate("/shop")}>
            View All Products →
          </button>
        </div>
        <div className="home-products-grid">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="home-product-card">
              <div className="home-product-img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="home-product-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                  }}
                />
                <button
                  className={`home-wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={18}
                    fill={isInWishlist(product.id) ? "var(--accent-olive)" : "transparent"}
                    stroke={isInWishlist(product.id) ? "var(--accent-olive)" : "currentColor"}
                  />
                </button>
              </div>
              <div className="home-product-info">
                <h3 className="home-product-title">{product.name}</h3>
                <div className="home-product-rating">
                  <Star size={12} fill="#E2BA4B" stroke="none" />
                  <span className="rating-value">{product.rating}</span>
                  <span className="reviews-count">({product.reviews})</span>
                </div>
                <div className="home-product-price-row">
                  <span className="current-price">${product.price}</span>
                  {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                </div>
                <button className="home-add-to-cart-btn" onClick={() => addToCart(product)}>
                  <ShoppingCart size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="home-section home-testimonials-section">
        <div className="home-section-center-header">
          <h2 className="home-section-title">What Our Customers Say</h2>
          <p className="home-section-subtitle">
            Trusted by thousands of happy customers who love shopping with Nexus Store.
          </p>
        </div>
        <div className="home-testimonials-wrapper">
          <div className="home-testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="home-testimonial-card">
                <div className="testimonial-quote-circle">
                  <svg viewBox="0 0 24 24" fill="#FFFFFF" width="16" height="16">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-profile">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div className="testimonial-user-info">
                    <div className="testimonial-name-row">
                      <span className="testimonial-name">{t.name}</span>
                      <svg
                        className="verified-badge-icon"
                        viewBox="0 0 24 24"
                        fill="var(--primary-olive)"
                        width="14"
                        height="14"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#E2BA4B" stroke="none" />
                      ))}
                    </div>
                    <span className="testimonial-designation">Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
