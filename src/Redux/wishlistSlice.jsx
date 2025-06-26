// Redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = localStorage.getItem("wishlistItems");
console.log("cartSlice get wishlistItems", savedWishlist);

const initialState = {
  items: savedWishlist ? JSON.parse(savedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
