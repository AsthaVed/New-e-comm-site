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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link as RouterLink, NavLink } from "react-router-dom";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      {loading ? (
        <>
          <Box
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Skeleton variant="rectangular" width={220} height={30} />
          </Box>
        </>
      ) : (
        <Box sx={{ backgroundColor: "black", py: 1 }}>
          <Typography
            variant="body2"
            align="center"
            color="white"
            sx={{ fontWeight: 500 }}
          >
            Sign up and get 20% off to your first order.{" "}
            <Link
              component={RouterLink}
              to="/signup"
              underline="always"
              color="inherit"
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              Sign Up Now
            </Link>
          </Typography>
        </Box>
      )}

      {/* Main Navbar */}
      <AppBar position="static" color="primary">
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
                <Skeleton variant="text" width={60} height={20} />
              </Box>

              {/* Center Skeleton (Search bar) */}
              <Box sx={{ flex: 1, mx: 4 }}>
                <Skeleton variant="rectangular" height={40} width="100%" />
              </Box>

              {/* Right Side Skeleton (Icons) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                    color: isActive ? "red" : "gray",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/productDetail"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "gray",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/sale"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "gray",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  On Sale
                </NavLink>
                <NavLink
                  to="/new"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "gray",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  New Arrivals
                </NavLink>
                <NavLink
                  to="/categoryPage"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "gray",
                  })}
                  color="inherit"
                  underline="hover"
                >
                  Brands
                </NavLink>
              </Box>

              {/* Center: Search Bar */}
              <Box sx={{ flex: 1, mx: 4, maxWidth: 500 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search products..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "#fff", borderRadius: 1 },
                  }}
                />
              </Box>

              {/* Right Side: Icons */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Tooltip title="Home">
                  <IconButton component={RouterLink} color="inherit" to="/">
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cart">
                  <IconButton component={RouterLink} color="inherit" to="/cart">
                    <ShoppingCartIcon />
                  </IconButton>
                </Tooltip>
                {/* {auth.isAuthenticated ? ( */}
                <Tooltip title="Logout">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      dispatch(logout());
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
