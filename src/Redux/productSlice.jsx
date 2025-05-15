// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// createSlice: Simplifies creating Redux reducers and actions.
// createAsyncThunk: Helps handle asynchronous logic like fetching data from an API.

// Async action to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products?limit=50');
    const data = await response.json();
    return data.products;
  }
);

// name: 'products' – this is used as the key in your Redux store.
// reducers: empty here because you're handling actions via extraReducers.
// extraReducers – Handle Async Actions
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
