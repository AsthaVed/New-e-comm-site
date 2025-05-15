// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// createSlice: Simplifies creating Redux reducers and actions.
// createAsyncThunk: Helps handle asynchronous logic like fetching data from an API.

// Async action to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=50");
    const data = await response.json();
    return data.products;
  }
);

// name: 'products' – this is used as the key in your Redux store.
// reducers: empty here because you're handling actions via extraReducers.
// extraReducers – Handle Async Actions
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    increaseProductQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Optionally remove item if quantity drops to 0
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = action.payload;
        state.items = action.payload.map((product) => ({
          ...product,
          quantity: 1, // Default quantity
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { increaseProductQuantity, decreaseProductQuantity } =
  productSlice.actions;
export default productSlice.reducer;
