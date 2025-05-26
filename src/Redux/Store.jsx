import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice"; // Import authentication reducer
import productSlice from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import categoryReducer from "./categorySlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth slice to store
    counter: counterReducer,
    products: productSlice,
    cart: cartReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
  },
});

export default store;
