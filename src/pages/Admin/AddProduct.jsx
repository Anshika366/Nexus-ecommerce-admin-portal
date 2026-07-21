import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productsApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Electronics",
    stock: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
  });

  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
      }}
    >
      <h2>Add New Inventory Item</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
          type="number"
          placeholder="Price ($)"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
          type="number"
          placeholder="Stock Units"
          required
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <textarea
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            height: "80px",
          }}
        />
        <button
          type="submit"
          disabled={addMutation.isPending}
          style={{
            background: "#0284c7",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {addMutation.isPending ? "Creating..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
