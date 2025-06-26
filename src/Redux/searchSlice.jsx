// Redux/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchProducts",
  initialState: {
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
