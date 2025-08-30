import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice"; // Import authentication reducer
import productSlice from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import categoryReducer from "./categorySlice"; 
import searchReducer from "./searchSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth slice to store
    counter: counterReducer,
    products: productSlice,
    cart: cartReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
    searchProducts: searchReducer
  },
});

export default store;

// configureStore({ reducer: {...} }) used for store creation
// middleware - Thunk included by default
// reducers - createSlice generates actions + reducer automatically

// 1️⃣ How Thunk is included in Redux Toolkit
// configureStore automatically adds Redux Thunk middleware.
// This means you can write async action creators (thunks) without manually configuring middleware.
// 2️⃣ Writing Async Actions in Redux Toolkit
// You can use createAsyncThunk, which is a Redux Toolkit helper that wraps async actions with Thunk
// 3️⃣ Using the Async Action in a Component

// C:\Program Files\MongoDB\Server\8.0\bin\