import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice"; // Import authentication reducer
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth slice to store
    counter: counterReducer,
    products: productSlice
  },
});

export default store;
