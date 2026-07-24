const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Smart Watch Series 5",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    stock: 25,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "High-end smart watch featuring custom heart rate monitoring, watch face custom styles, and persistent cellular connectivity."
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 59.99,
    oldPrice: 89.99,
    rating: 4.7,
    reviews: 98,
    category: "Fashion",
    stock: 45,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    description: "Immersive over-ear wireless headphones with active noise cancellation and soft padded leather ear cups."
  },
  {
    id: "3",
    name: "Travel Backpack",
    price: 39.99,
    oldPrice: 69.99,
    rating: 4.6,
    reviews: 156,
    category: "Home & Kitchen",
    stock: 12,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
    description: "Rugged and water-resistant laptop travel pack containing multi-compartment organizers and USB charging extension ports."
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 49.99,
    oldPrice: 79.99,
    rating: 4.4,
    reviews: 78,
    category: "Fashion",
    stock: 30,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    description: "Highly breathable running sneakers equipped with custom grid grip soles and soft shock absorption technology."
  },
  {
    id: "5",
    name: "Luxury Perfume",
    price: 29.99,
    oldPrice: 49.99,
    rating: 4.8,
    reviews: 64,
    category: "Beauty",
    stock: 18,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "Exquisite scent featuring light lavender top tones combined with rich organic amber oil notes."
  },
  {
    id: "6",
    name: "Matte Lipstick Kit",
    price: 19.99,
    oldPrice: 29.99,
    rating: 4.6,
    reviews: 42,
    category: "Beauty",
    stock: 50,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    description: "Smooth matte liquid lip kit containing three matching natural shades for long-lasting visual tones."
  },
  {
    id: "7",
    name: "Hydrating Face Serum",
    price: 24.99,
    oldPrice: 39.99,
    rating: 4.8,
    reviews: 89,
    category: "Beauty",
    stock: 35,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    description: "Dropper bottle skin serum enriched with organic essential elements to lock moisture and skin elasticity."
  },
  {
    id: "8",
    name: "Minimalist Sunglasses",
    price: 34.99,
    oldPrice: 59.99,
    rating: 4.5,
    reviews: 110,
    category: "Accessories",
    stock: 22,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    description: "Elegant polarized sunglasses with slim stainless steel frames and lightweight glass elements."
  },
  {
    id: "9",
    name: "AirPods Max Space Gray",
    price: 549.99,
    oldPrice: 599.99,
    rating: 4.8,
    reviews: 310,
    category: "Electronics",
    stock: 14,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "High-fidelity audio with active noise cancellation, custom audio equalizer, and spatial sound."
  },
  {
    id: "10",
    name: "Custom Mechanical Keyboard",
    price: 189.99,
    oldPrice: 219.99,
    rating: 4.9,
    reviews: 145,
    category: "Electronics",
    stock: 9,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    description: "Aluminum body with hot-swappable switches and customizable RGB LED backlighting."
  },
  {
    id: "11",
    name: "Ultra-Wide 34\" Curved Display",
    price: 899.99,
    oldPrice: 999.99,
    rating: 4.7,
    reviews: 88,
    category: "Electronics",
    stock: 5,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    description: "144Hz OLED curved gaming and creator display with Thunderbolt 4 connectivity."
  },
  {
    id: "12",
    name: "Minimalist Desk Pad",
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.4,
    reviews: 160,
    category: "Home & Kitchen",
    stock: 40,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    description: "Premium felt desk mat with built-in wireless charging pad for multi-device setups."
  },
  {
    id: "13",
    name: "Minimalist Design Handbook",
    price: 14.99,
    oldPrice: 24.99,
    rating: 4.9,
    reviews: 180,
    category: "Books",
    stock: 65,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    description: "A comprehensive design book highlighting classical grid structures, clean spacing, and type rules."
  },
  {
    id: "14",
    name: "Sartre's Existential Essays",
    price: 18.99,
    oldPrice: 29.99,
    rating: 4.6,
    reviews: 45,
    category: "Books",
    stock: 30,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    description: "A deep philosophical dive into existentialism, freedom, responsibility, and human choices."
  },
  {
    id: "15",
    name: "Wooden Building Blocks Set",
    price: 44.99,
    oldPrice: 59.99,
    rating: 4.7,
    reviews: 52,
    category: "Toys & Games",
    stock: 15,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    description: "Clean organic building block set showcasing soft colors and water-based, non-toxic wood coatings."
  },
  {
    id: "16",
    name: "Retro Handheld Game Console",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.5,
    reviews: 88,
    category: "Toys & Games",
    stock: 20,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80",
    description: "Retro emulator gaming console containing 10,000+ classic titles built inside a premium chassis."
  },
  {
    id: "17",
    name: "Amber Dropper Essential Oil",
    price: 15.99,
    oldPrice: 24.99,
    rating: 4.8,
    reviews: 120,
    category: "Health & Wellness",
    stock: 45,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "100% organic cold-pressed wellness drops designed to relax minds and elevate visual focus."
  },
  {
    id: "18",
    name: "Organic Herbal Tea Blend",
    price: 12.99,
    oldPrice: 19.99,
    rating: 4.7,
    reviews: 67,
    category: "Health & Wellness",
    stock: 80,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "Chamomile and green herbal tea blend sourced directly from high-altitude chemical-free plantations."
  },
  {
    id: "19",
    name: "Premium Leather Key Case",
    price: 24.99,
    oldPrice: 39.99,
    rating: 4.5,
    reviews: 54,
    category: "Automotive",
    stock: 35,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    description: "Handstitched grain leather key case with metal zipper components and scratch-resistant finishes."
  },
  {
    id: "20",
    name: "Smart OBD2 Car Diagnostic",
    price: 49.99,
    oldPrice: 79.99,
    rating: 4.6,
    reviews: 98,
    category: "Automotive",
    stock: 10,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    description: "Bluetooth-compatible automotive diagnostics scanner reading real-time stats directly onto smart apps."
  },
  {
    id: "21",
    name: "Fresh Organic Fruit Basket",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.8,
    reviews: 112,
    category: "Groceries",
    stock: 14,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    description: "Assorted freshly harvested organic orchard fruits packaged inside eco-friendly woven boxes."
  },
  {
    id: "22",
    name: "Premium Cold Brew Coffee",
    price: 18.99,
    oldPrice: 24.99,
    rating: 4.7,
    reviews: 88,
    category: "Groceries",
    stock: 50,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    description: "Arabica bean cold brew infusion bottles presenting chocolate undertones and zero acidity."
  },
  {
    id: "23",
    name: "Terracotta Potted Houseplant",
    price: 22.99,
    oldPrice: 34.99,
    rating: 4.9,
    reviews: 210,
    category: "Garden & Outdoor",
    stock: 18,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    description: "Easy-to-grow green houseplant potted inside a natural terracotta clay cup with soil mix."
  },
  {
    id: "24",
    name: "Minimalist Garden Hand Tool",
    price: 15.99,
    oldPrice: 24.99,
    rating: 4.5,
    reviews: 38,
    category: "Garden & Outdoor",
    stock: 40,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    description: "Stainless steel trowel tool matching solid ash wood handle mounts for comfortable soil digging."
  }
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
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error("Product not found");
  return product;
};

export const createProduct = async (newProduct) => {
  await new Promise((res) => setTimeout(res, 400));
  const products = JSON.parse(localStorage.getItem("nexus_products")) || [];
  const productWithId = { 
    ...newProduct, 
    id: String(Date.now()),
    rating: 4.5,
    reviews: 1,
    stock: newProduct.stock || 10
  };
  const updated = [productWithId, ...products];
  localStorage.setItem("nexus_products", JSON.stringify(updated));
  return productWithId;
};

export const deleteProduct = async (id) => {
  await new Promise((res) => setTimeout(res, 300));
  const products = JSON.parse(localStorage.getItem("nexus_products")) || [];
  const updated = products.filter((p) => String(p.id) !== String(id));
  localStorage.setItem("nexus_products", JSON.stringify(updated));
  return id;
};

export const updateProduct = async (updatedProduct) => {
  await new Promise((res) => setTimeout(res, 300));
  const products = JSON.parse(localStorage.getItem("nexus_products")) || [];
  const updated = products.map((p) =>
    String(p.id) === String(updatedProduct.id) ? { ...p, ...updatedProduct } : p
  );
  localStorage.setItem("nexus_products", JSON.stringify(updated));
  return updatedProduct;
};
