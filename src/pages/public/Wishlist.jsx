import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [removingIds, setRemovingIds] = useState([]);

  const handleRemove = (product) => {
    if (removingIds.includes(product.id)) return;
    setRemovingIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      toggleWishlist(product);
      setRemovingIds((prev) => prev.filter((id) => id !== product.id));
    }, 300); 
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-page-header">
        <h2>My Wishlist</h2>
        {wishlist.length > 0 && (
          <span className="wishlist-count-badge">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty-state">
          <div className="wishlist-empty-icon-wrapper">
            <Heart size={40} fill="none" stroke="var(--accent-olive)" strokeWidth={1.5} />
          </div>
          <h3>Your wishlist is empty</h3>
          <p>Explore our shop, find items you love, and save them for later.</p>
          <Link to="/" className="wishlist-explore-btn">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="wishlist-products-grid">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className={`home-product-card ${removingIds.includes(product.id) ? "removing" : ""}`}
            >
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
                  className="home-wishlist-btn active"
                  onClick={() => handleRemove(product)}
                  aria-label="Remove from wishlist"
                >
                  <Heart size={18} fill="var(--accent-olive)" stroke="var(--accent-olive)" />
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
                <div className="wishlist-card-buttons">
                  <button className="home-add-to-cart-btn" onClick={() => addToCart(product)}>
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="home-wishlist-remove-btn" onClick={() => handleRemove(product)}>
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
