import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  fetchProducts,
} from "../Redux/productSlice";
import { Add, Remove } from "@mui/icons-material";
import { addToCart } from "../Redux/cartSlice";
import { toast } from "react-toastify";

function ProductDetail() {
  const { sku } = useParams();
  // console.log("iddddd", sku);
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const found = products.find((p) => p.sku.toString() === sku);
      setProduct(found);
    }
  }, [products, sku, dispatch]);

  if (loading || !product)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={{ xs: 2, md: 5 }} sx={{ position: "relative" }}>
      <Paper elevation={3} sx={{ borderRadius: 4, p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* <Grid container spacing={4}> */}
          {/* Image Section */}
          {/* <Grid item xs={12} md={6}> */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: "50%" },
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{
                width: "100%",
                height: { xs: 300, md: 450 },
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>
          {/* </Grid> */}

          {/* Product Info Section */}
          {/* <Grid item xs={12} md={6}> */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              ${product.price}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description || "No description available."}
            </Typography>

            <Box display="flex" alignItems="center">
              <Box mt={1} display="flex" alignItems="center" width="20%">
                <IconButton
                  onClick={() => dispatch(decreaseProductQuantity(product.id))}
                >
                  <Remove />
                </IconButton>
                <Typography px={2}>{product.quantity}</Typography>
                <IconButton
                  onClick={() => dispatch(increaseProductQuantity(product.id))}
                >
                  <Add />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success("Item added to cart!");
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  ml: 2, // margin-left to separate from Add to Cart
                  backgroundColor: "#43a047", // green color
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#388e3c", // darker green on hover
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
          {/* </Grid> */}
          {/* </Grid> */}
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetail;