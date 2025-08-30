import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice"; // <-- Make sure you have this action
import {
  AppBar,
  Toolbar,
  Typography,
  Skeleton,
  Box,
  IconButton,
  Link,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/cartSlice";
import { clearWishlist } from "../Redux/wishlistSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { searchProducts } from "../Redux/searchSlice";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // const searchResults = useSelector((state) => state.products.searchResults);
  // const searchResults = useSelector((state) => state.searchProducts.searchResults || []);
  const searchResults = useSelector(
    (state) => state.searchProducts.searchResults
  );
  const searchLoading = useSelector((state) => state.searchProducts.loading);

  console.log("searchResults", searchResults);

  const auth = useSelector((state) => state.auth);
  const cartQuantity = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const dispatch = useDispatch();

  const onSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      dispatch(searchProducts(value));
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        dispatch(searchProducts(searchTerm));
      }
    }, 500); // Wait 500ms after the last keystroke

    // Cleanup function that runs before next useEffect call or component unmount
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <AppBar position="sticky" color="primary" sx={{ zIndex: 1301 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {loading ? (
            <>
              {/* Left Side Skeleton */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={60} height={20} />
                {/* <Skeleton variant="text" width={60} height={20} /> */}
              </Box>

              {/* Center Skeleton (Search bar) */}
              <Box sx={{ flex: 1, mx: 4 }}>
                <Skeleton variant="rectangular" height={40} width="100%" />
              </Box>

              {/* Right Side Skeleton (Icons) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
            </>
          ) : (
            <>
              {/* Left Side: Logo + Links */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography variant="h6">MyShop</Typography>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Home
                </NavLink>
                {/* <NavLink
                  to="/productDetail"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Shop
                </NavLink> */}
                {/* <NavLink
                  to="/sale"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  On Sale
                </NavLink> */}
                {/* <NavLink
                  to="/new"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  New Arrivals
                </NavLink> */}
                <NavLink
                  to="/products/category"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                    textDecoration: isActive ? "underline" : "none",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Brands
                </NavLink>
              </Box>

              {/* Center: Search Bar */}
              <Box sx={{ flex: 1, mx: 4, position: "relative" }}>
                <TextField
                   fullWidth
                  size="small"
                  placeholder="Search products..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={onSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "#fff", borderRadius: 1 },
                  }}
                />

                {/* Search Results Dropdown */}
                {!searchLoading && searchTerm.length > 0 && (
                  <>
                    {searchResults.length > 0 ? (
                      <Paper
                        elevation={4}
                        sx={{
                          position: "absolute",
                          top: "105%",
                          left: 0,
                          width: "100%",
                          zIndex: 10,
                          maxHeight: 300,
                          overflowY: "auto",
                        }}
                      >
                        {/* Close button on top right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <CloseIcon
            sx={{ cursor: "pointer", position: "absolute", top: 4, right: 4, zIndex: 11 }}
            onClick={() => setSearchTerm("")}
          />
        </Box>
                        <List dense>
                          {searchResults.map((product) => (
                            <ListItem
                              button
                              key={product.sku}
                              onClick={() => {
                                navigate(`/product/${product.sku}`);
                                setSearchTerm("");
                              }}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                              <ListItemText
                                primary={product.title}
                                secondary={`$${product.price.toFixed(2)}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    ) : (
                      <Paper
                        elevation={4}
                        sx={{
                          position: "absolute",
                          top: "105%",
                          left: 0,
                          width: "100%",
                          zIndex: 10,
                          paddingTop: 2,
                          paddingBottom: 2,
                          textAlign: "center",
                        }}
                      >
                        {/* Close button on top right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <CloseIcon
            sx={{  cursor: "pointer", position: "absolute", top: 4, right: 4, zIndex: 11 }}
            onClick={() => setSearchTerm("")}
          />
        </Box>
                        <Typography>No products found.</Typography>
                      </Paper>
                    )}
                  </>
                )}
              </Box>

              {/* Right Side: Icons */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Tooltip title="Home">
                  <IconButton component={NavLink} color="inherit" to="/">
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account">
                  <IconButton component={NavLink} color="inherit" to="/account">
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cart">
                  <IconButton component={NavLink} color="inherit" to="/cart">
                    <Badge
                      badgeContent={cartQuantity}
                      color="secondary"
                    ></Badge>
                    <ShoppingCartIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Wishlist">
                  <IconButton
                    component={NavLink}
                    color="inherit"
                    to="/wishlist"
                  >
                    <Badge
                      badgeContent={wishlistCount}
                      color="secondary"
                    ></Badge>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                {/* {auth.isAuthenticated ? ( */}
                <Tooltip title="Logout">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(clearCart());
                      dispatch(clearWishlist());
                      navigate("/login");
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
                {/* // ) : (
                //   <>
                //     <Tooltip title="Login">
                //       <IconButton color="inherit" href="/login">
                //         <LoginIcon />
                //       </IconButton>
                //     </Tooltip>
                //     <Tooltip title="Signup">
                //       <IconButton color="inherit" href="/signup">
                //         <HowToRegIcon />
                //       </IconButton>
                //     </Tooltip>
                //   </>
                // )} */}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
