import React from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeFromCart,
} from "../Redux/cartSlice";
import { Link as RouterLink } from "react-router-dom";
import LazyImage from "../Components/LazyImage";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5">Your cart is empty.</Typography>
        <Button
          variant="contained"
          size="small"
          component={RouterLink}
          to="/products/category"
          sx={{ mt: 4, p: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Two-column layout */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Left Side - Cart Items */}
        <Box flex={2}>
          <Box
            sx={{
              maxHeight: "60vh",
              overflowY: "auto",
              pr: 1,
              mb: 4,
            }}
          >
            {cartItems.map((item) => (
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

                  {/* Quantity Controls */}
                  <Box mt={1} display="flex" alignItems="center" width="20%">
                    <IconButton
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Remove />
                    </IconButton>
                    <Typography px={2}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Add />
                    </IconButton>
                  </Box>

                  {/* Delete Item */}
                  <Box mt={1} display="flex" alignItems="center" width="5%">
                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Cart Action Buttons */}
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/products/category"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Box>
        </Box>

        {/* Right Side - Order Details */}
        <Box flex={1}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>${total.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Pay Now
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
