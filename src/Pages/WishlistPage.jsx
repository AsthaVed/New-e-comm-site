import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../Redux/wishlistSlice";
import { Typography, Box, Paper, IconButton, Divider, Link } from "@mui/material";
import { Delete } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromWishlist } from "../Redux/wishlistSlice";
import { Link as RouterLink } from "react-router-dom";
import LazyImage from "../Components/LazyImage";

function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <Box p={{ xs: 2, md: 5 }} sx={{ position: "relative", padding: "10px 40px 40px 40px !important" }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {wishlist.map((item) => (
        <Box key={item.id} sx={{ mb: 3 }}>
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", p: 2 }}
          >
            <Link component={RouterLink} to={`/product/${item.sku}`}>
              <LazyImage
                height="100"
                width="100"
                src={item.images[0]}
                alt={item.title}
              />
            </Link>

            <Box sx={{ flexGrow: 1, ml: 5 }}>
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to={`/product/${item.sku}`}
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.title}
              </Typography>
              <Typography color="text.secondary">${item.price}</Typography>
            </Box>

            <Box mt={1} display="flex" alignItems="center" width="5%">
              <IconButton onClick={() => dispatch(removeFromWishlist(item))}>
                <Delete />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      ))}

      {wishlist.length === 0 && (
        <Typography color="text.secondary">Your wishlist is empty.</Typography>
      )}
    </Box>
  );
}

export default WishlistPage;
