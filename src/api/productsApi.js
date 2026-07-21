const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Aura Noise-Canceling Headphones",
    price: 299.99,
    category: "Electronics",
    stock: 15,
    description:
      "Premium wireless headphones with industry-leading active noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: "prod-2",
    name: "Minimalist Leather Watch",
    price: 149.5,
    category: "Accessories",
    stock: 24,
    description:
      "Sleek analog wristwatch crafted with genuine Italian leather strap.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: "prod-3",
    name: "Ergonomic Mechanical Keyboard",
    price: 189.0,
    category: "Electronics",
    stock: 8,
    description:
      "RGB tactile mechanical keyboard designed for high-productivity typing.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
  },
];

if (!localStorage.getItem("nexus_products")) {
  localStorage.setItem("nexus_products", JSON.stringify(INITIAL_PRODUCTS));
}

export const fetchProducts = async () => {
  await new Promise((res) => setTimeout(res, 300));
  const data = localStorage.getItem("nexus_products");
  return JSON.parse(data) || [];
};

export const fetchProductById = async (id) => {
  await new Promise((res) => setTimeout(res, 300));
  const products = JSON.parse(localStorage.getItem("nexus_products")) || [];
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
};
