import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null, // Stores user data (if logged in)
//   name: null,
//   password: null,
//   isAuthenticated: false, // Authentication status
// };
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  name: storedUser?.name || null,
  password: storedUser?.password || null,
  isAuthenticated: !!storedUser, // true if user exists in localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user details
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      // console.log("User cartItemss:", localStorage.getItem("cartItems")); // Should be null
    },
    logout: (state) => {
      state.user = null;
      state.name = null;
      state.password = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      // Only do this if you really want to reset cart on logout
      // localStorage.removeItem("cartItems"); // <- maybe this is in your logout code
      // console.log("User removed:", localStorage.getItem("user")); // Should be null
      // console.log("User cartItems:", localStorage.getItem("cartItems")); // Should be null
    },
  },
});

export const { login, logout } = authSlice.actions; // Export actions
export default authSlice.reducer;