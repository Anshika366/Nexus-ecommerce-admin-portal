import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart, Heart, Star, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { fetchProducts } from "../../api/productsApi";

const Shop = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("popularity");
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories([cat]);
      setVisibleCount(12);
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setVisibleCount(12); 
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { products: initialProducts } = useLoaderData() || { products: [] };

  const { data: products = initialProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: initialProducts,
  });

  const categoriesList = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Accessories",
    "Books",
    "Toys & Games",
    "Health & Wellness",
    "Automotive",
    "Groceries",
    "Garden & Outdoor",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setVisibleCount(12); 
  };

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setVisibleCount(12); 
  };

  const resetFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setSelectedCategories([]);
    setMaxPrice(1000);
    setSortBy("popularity");
    setVisibleCount(12);
    setSearchParams({});
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price;
    } else if (sortBy === "price-high-low") {
      return b.price - a.price;
    } else {
      
      return b.reviews - a.reviews;
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setIsLoadingMore(false);
    }, 500); 
  };

  return (
    <div className="shop-page-container">
      {}
      <nav className="shop-breadcrumbs" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Shop</span>
      </nav>

      {}
      <div className="shop-layout-row">
        {}
        <aside className="shop-sidebar">
          <div className="sidebar-header">
            <SlidersHorizontal size={16} />
            <h3>Filters</h3>
            {(selectedCategories.length > 0 || searchTerm || maxPrice < 1000) && (
              <button className="sidebar-reset-btn" onClick={resetFilters}>
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="sidebar-group">
            <h4>Search</h4>
            <div className="sidebar-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-group">
            <h4>Categories</h4>
            <div className="sidebar-checkboxes-list">
              {categoriesList.map((cat) => (
                <label key={cat} className="sidebar-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-group">
            <div className="price-header">
              <h4>Max Price</h4>
              <span className="price-value">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={handlePriceChange}
              className="price-slider"
            />
            <div className="price-range-limits">
              <span>$10</span>
              <span>$1000</span>
            </div>
          </div>
        </aside>

        {}
        <main className="shop-main-content">
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <h2>
                {selectedCategories.length === 1
                  ? selectedCategories[0]
                  : selectedCategories.length > 1
                  ? selectedCategories.join(", ")
                  : "All Products"}
              </h2>
              {!isLoading && (
                <span className="toolbar-count">
                  Showing {displayedProducts.length} of {sortedProducts.length} products
                </span>
              )}
            </div>
            <div className="toolbar-right">
              <label htmlFor="sort-dropdown">Sort by:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="shop-loading-state">
              <div className="spinner"></div>
              <p>Fetching Nexus products...</p>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="shop-empty-state">
              <Search size={48} className="empty-icon" />
              <h3>No products found</h3>
              <p>Try adjusting your search query or categories to find what you're looking for.</p>
              <button className="shop-reset-button" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="home-products-grid shop-grid">
                {displayedProducts.map((product) => (
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
                        <span className="rating-value">{product.rating || "4.6"}</span>
                        <span className="reviews-count">({product.reviews || "45"})</span>
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

              {visibleCount < sortedProducts.length && (
                <div className="shop-load-more-container">
                  <button
                    className="shop-load-more-btn"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
