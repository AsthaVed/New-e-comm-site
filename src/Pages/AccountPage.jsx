import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import WishlistPage from "./WishlistPage";

// Dummy components for each tab (you can replace with real ones)
const Profile = () => <Typography>Profile Information</Typography>;
const Address = () => <Typography>Address Book</Typography>;
const Orders = () => <Typography>Your Orders</Typography>;
// const Wishlist = () => <Typography>Your Wishlist</Typography>;

export default function AccountPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isDark = false; // Set your theme logic here
  const [selectedTab, setSelectedTab] = useState("Profile");

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { label: "Profile", value: "Profile", icon: <PersonIcon /> },
    { label: "Address", value: "Address", icon: <LocationOnIcon /> },
    { label: "Wishlist", value: "Wishlist", icon: <FavoriteIcon /> },
    { label: "Orders", value: "Orders", icon: <ShoppingBagIcon /> },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Profile":
        return <Profile />;
      case "Address":
        return <Address />;
      case "Wishlist":
        return <WishlistPage />;
      case "Orders":
        return <Orders />;
      default:
        return <Typography>Select a section</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", mt: 2, minHeight: "80vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          p: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>
        <Divider sx={{ my: 2 }} />

        {navItems.map((item) => (
          <Box
            key={item.value}
            onClick={() => setSelectedTab(item.value)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              marginBottom: 1,
              backgroundColor:
                selectedTab === item.value ? "#e0f7fa" : "transparent",
              fontWeight: selectedTab === item.value ? "bold" : "normal",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {item.icon}
            <Typography variant="body1">{item.label}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isDark ? <Brightness4Icon /> : <Brightness7Icon />}
          <Typography variant="body2">Dark Mode</Typography>
          <Switch checked={isDark} disabled />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            color: "error.main",
          }}
        >
          <LogoutIcon />
          <Typography variant="body2">Logout</Typography>
        </Box>
      </Box>

      {/* Right Panel Content */}
      <Box sx={{ flex: 1, p: 3 }}>{renderTabContent()}</Box>
    </Box>
  );
}
