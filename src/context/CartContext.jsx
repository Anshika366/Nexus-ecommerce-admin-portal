import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const INITIAL_CART = JSON.parse(localStorage.getItem("nexus_cart")) || [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }
      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART);

  useEffect(() => {
    localStorage.setItem("nexus_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
