import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct, createProduct, updateProduct } from "../../api/productsApi";
import { Plus, Trash2, Edit3, Search, Package, AlertCircle, X } from "lucide-react";

const ProductManagement = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Electronics");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductStock, setNewProductStock] = useState("10");
  const [formError, setFormError] = useState("");

  const [editProductName, setEditProductName] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductCategory, setEditProductCategory] = useState("Electronics");
  const [editProductImage, setEditProductImage] = useState("");
  const [editProductStock, setEditProductStock] = useState("10");
  const [editFormError, setEditFormError] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old) => {
        if (!old) return [];
        return old.filter((product) => String(product.id) !== String(deletedId));
      });

      return { previousProducts };
    },
    onError: (err, deletedId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setProductToDelete(null);
    },
  });

  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsAddModalOpen(false);
      resetAddForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
    },
  });

  const resetAddForm = () => {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductCategory("Electronics");
    setNewProductImage("");
    setNewProductStock("10");
    setFormError("");
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!newProductName.trim() || newProductName.trim().length < 3) {
      setFormError("Product name must be at least 3 characters long.");
      return;
    }
    if (!newProductPrice || parseFloat(newProductPrice) <= 0) {
      setFormError("Price must be a valid positive number.");
      return;
    }
    if (!newProductStock || parseInt(newProductStock) < 0) {
      setFormError("Stock cannot be a negative value.");
      return;
    }
    if (newProductImage && !/^https?:\/\/.+/i.test(newProductImage)) {
      setFormError("Image URL must start with http:// or https://");
      return;
    }

    addMutation.mutate({
      name: newProductName,
      price: parseFloat(newProductPrice),
      category: newProductCategory,
      image: newProductImage || "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Product",
      stock: parseInt(newProductStock),
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductPrice(product.price.toString());
    setEditProductCategory(product.category);
    setEditProductImage(product.image);
    setEditProductStock(product.stock.toString());
    setEditFormError("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditFormError("");

    if (!editProductName.trim() || editProductName.trim().length < 3) {
      setEditFormError("Product name must be at least 3 characters long.");
      return;
    }
    if (!editProductPrice || parseFloat(editProductPrice) <= 0) {
      setEditFormError("Price must be a valid positive number.");
      return;
    }
    if (!editProductStock || parseInt(editProductStock) < 0) {
      setEditFormError("Stock cannot be a negative value.");
      return;
    }
    if (editProductImage && !/^https?:\/\/.+/i.test(editProductImage)) {
      setEditFormError("Image URL must start with http:// or https://");
      return;
    }

    updateMutation.mutate({
      id: editingProduct.id,
      name: editProductName,
      price: parseFloat(editProductPrice),
      category: editProductCategory,
      image: editProductImage,
      stock: parseInt(editProductStock),
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="spinner"></div>
        <p>Loading inventory database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <AlertCircle size={40} color="#EF4444" />
        <h3>Failed to fetch inventory</h3>
        <p>There was an error loading the inventory data. Please try again.</p>
        <button onClick={() => queryClient.refetchQueries(["products"])} className="admin-primary-btn">
          Retry Fetch
        </button>
      </div>
    );
  }

  return (
    <div>
      {}
      <div className="admin-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <h1 className="admin-title" style={{ color: "#111827", margin: 0 }}>Inventory Management</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="admin-stats-pill">
            Total Products: <strong>{products.length}</strong>
          </span>
          <button className="admin-primary-btn" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {}
      <div className="admin-toolbar-row" style={{ marginBottom: "2rem" }}>
        <div className="admin-search-wrapper" style={{ maxWidth: "400px", width: "100%" }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search inventory by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {}
      {filteredProducts.length === 0 ? (
        <div className="admin-empty-state">
          <Package size={48} className="empty-icon" />
          <h3>No products found</h3>
          <p>{products.length === 0 ? "Inventory is empty. Start by adding your first product." : "Try adjusting your search criteria."}</p>
          {products.length === 0 && (
            <button className="admin-primary-btn" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} />
              <span>Add your first product</span>
            </button>
          )}
        </div>
      ) : (
        <div className="admin-table-container admin-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Category</th>
                <th>Price</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-thumb"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                        }}
                      />
                      <span className="admin-product-name">{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-category-badge">{product.category}</span>
                  </td>
                  <td className="admin-price-cell">${product.price.toFixed(2)}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <button
                        className="admin-edit-btn"
                        onClick={() => handleEditClick(product)}
                        title="Edit Product"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        className="admin-trash-btn"
                        onClick={() => setProductToDelete(product)}
                        title="Delete Product"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {isAddModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              {formError && <div className="modal-error-bar">⚠️ {formError}</div>}
              
              <div className="form-group">
                <label htmlFor="prod-name">Product Name *</label>
                <input
                  id="prod-name"
                  type="text"
                  placeholder="e.g. Amber Dropper Essential Oil"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="prod-price">Price ($) *</label>
                  <input
                    id="prod-price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="prod-stock">Stock Units *</label>
                  <input
                    id="prod-stock"
                    type="number"
                    placeholder="10"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="prod-category">Category *</label>
                <select
                  id="prod-category"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Books">Books</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Garden & Outdoor">Garden & Outdoor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prod-image">Image URL</label>
                <input
                  id="prod-image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-primary-btn"
                  disabled={addMutation.isPending}
                >
                  {addMutation.isPending ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {editingProduct && (
        <div className="admin-modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              {editFormError && <div className="modal-error-bar">⚠️ {editFormError}</div>}
              
              <div className="form-group">
                <label htmlFor="edit-prod-name">Product Name *</label>
                <input
                  id="edit-prod-name"
                  type="text"
                  value={editProductName}
                  onChange={(e) => setEditProductName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="edit-prod-price">Price ($) *</label>
                  <input
                    id="edit-prod-price"
                    type="number"
                    step="0.01"
                    value={editProductPrice}
                    onChange={(e) => setEditProductPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="edit-prod-stock">Stock Units *</label>
                  <input
                    id="edit-prod-stock"
                    type="number"
                    value={editProductStock}
                    onChange={(e) => setEditProductStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-prod-category">Category *</label>
                <select
                  id="edit-prod-category"
                  value={editProductCategory}
                  onChange={(e) => setEditProductCategory(e.target.value)}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Books">Books</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Garden & Outdoor">Garden & Outdoor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-prod-image">Image URL</label>
                <input
                  id="edit-prod-image"
                  type="url"
                  value={editProductImage}
                  onChange={(e) => setEditProductImage(e.target.value)}
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-primary-btn"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {productToDelete && (
        <div className="admin-modal-overlay" onClick={() => setProductToDelete(null)}>
          <div className="admin-modal-card confirm-delete-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ color: "#EF4444" }}>Confirm Product Deletion</h3>
              <button className="modal-close-btn" onClick={() => setProductToDelete(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: "1.5rem" }}>
              <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                Are you sure you want to permanently delete <strong>{productToDelete.name}</strong> from the database? This action is irreversible.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FAF9F6",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                }}
              >
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600/FAF9F6/78864A?text=Nexus+Store";
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700 }}>{productToDelete.name}</h4>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{productToDelete.category}</span>
                </div>
              </div>
            </div>
            <div className="modal-actions-row" style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-color)" }}>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-primary-btn delete-btn"
                style={{ background: "#EF4444" }}
                onClick={() => deleteMutation.mutate(productToDelete.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Yes, Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
