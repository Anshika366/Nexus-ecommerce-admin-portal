import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [isPending, startTransition] = useTransition();

  const allCategories = [
    {
      id: 1,
      title: "Electronics",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80",
      bgColor: "#EEF5FF",
      itemCount: 154,
    },
    {
      id: 2,
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FDEEEF",
      itemCount: 320,
    },
    {
      id: 3,
      title: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FFF8E5",
      itemCount: 89,
    },
    {
      id: 4,
      title: "Beauty",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F2EEFF",
      itemCount: 112,
    },
    {
      id: 5,
      title: "Sports",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
      bgColor: "#EEF8F7",
      itemCount: 65,
    },
    {
      id: 6,
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FFF2E8",
      itemCount: 178,
    },
    {
      id: 7,
      title: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
      bgColor: "#FFFBF0",
      itemCount: 142,
    },
    {
      id: 8,
      title: "Toys & Games",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F0FAF0",
      itemCount: 98,
    },
    {
      id: 9,
      title: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F5F2EB",
      itemCount: 135,
    },
    {
      id: 10,
      title: "Automotive",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F1F3F5",
      itemCount: 74,
    },
    {
      id: 11,
      title: "Groceries",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      bgColor: "#F6FAF2",
      itemCount: 210,
    },
    {
      id: 12,
      title: "Garden & Outdoor",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
      bgColor: "#EBF5F0",
      itemCount: 88,
    },
  ];

  const filteredCategories = allCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    } else {
      
      return b.itemCount - a.itemCount;
    }
  });

  return (
    <div className="categories-page-container">
      {}
      <nav className="categories-breadcrumbs" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Categories</span>
      </nav>

      {}
      <div className="categories-header-row">
        <div className="categories-title-col">
          <h1>Browse Categories</h1>
          <p>Explore our curated collections across various categories.</p>
        </div>
      </div>

      {}
      <div className="categories-filter-bar">
        <div className="categories-search-box">
          <Search size={18} className="search-box-icon" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => {
              startTransition(() => {
                setSearchQuery(e.target.value);
              });
            }}
          />
        </div>
        <div className="categories-sort-box">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {}
      <div className={`home-category-circles-grid categories-page-grid ${isPending ? "pending" : ""}`}>
        {sortedCategories.map((category) => (
          <div key={category.id} className="home-category-circle-card categories-page-card">
            <div className="home-circle-img-box" style={{ backgroundColor: category.bgColor }}>
              <img
                src={category.image}
                alt={category.title}
                loading="lazy" 
              />
            </div>
            <span className="home-circle-title">{category.title}</span>
            <span className="category-item-count">{category.itemCount} Products</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
