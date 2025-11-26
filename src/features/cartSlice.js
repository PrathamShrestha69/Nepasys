import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "nepasys_cart";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const save = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {}
};

const initialState = {
  items: load(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      save(state.items);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      save(state.items);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.quantity = quantity;
      save(state.items);
    },
    clearCart(state) {
      state.items = [];
      save(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
