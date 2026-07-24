export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex > -1) {
        const updated = [...state];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};
