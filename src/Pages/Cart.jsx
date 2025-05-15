import React, {useEffect} from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Paper
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeFromCart,
} from '../Redux/cartSlice';
// import { fetchProducts } from "../Redux/productSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  //  const { items: products, loading } = useSelector((state) => state.products);
  //   console.log("items", products);
  //   console.log("loading", loading);
  
    // useEffect(() => {
    //   dispatch(fetchProducts());
    // }, [dispatch]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* <Box container spacing={3}> */}
        {cartItems.map((item) => (
          <Box key={item.id} sx={{ mb: 3 }}>
            <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <CardMedia
                component="img"
                image={item.images[0]}
                alt={item.title}
                sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, mr: 6 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">${item.price}</Typography>
                
              </Box>
              <Box mt={1} display="flex" alignItems="center" width="20%">
                  <IconButton onClick={() => dispatch(decreaseQuantity(item.id))}>
                    <Remove />
                  </IconButton>
                  <Typography px={2}>{item.quantity}</Typography>
                  <IconButton onClick={() => dispatch(increaseQuantity(item.id))}>
                    <Add />
                  </IconButton>
                </Box>
                <Box mt={1} display="flex" alignItems="center" width="5%">
              <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
                <Delete />
              </IconButton>
              </Box>
            </Paper>
          </Box>
        ))}
      {/* </Box> */}

      <Divider sx={{ my: 4 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">Total: 1000</Typography>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" size="large">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
