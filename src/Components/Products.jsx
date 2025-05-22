import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Box,
  Button,
  Link
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productSlice";
import { Link as RouterLink } from 'react-router-dom';
import LazyImage from "./LazyImage";

function Products({ pageTitle = "Welcome" }) {
  //   const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  console.log("items", products);
  console.log("loading", loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Simulate data loading
  //   useEffect(() => {
  //     setTimeout(() => setLoading(false), 2000);
  //   }, []);
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          my: 3,
          width: "100%",
          padding: "0px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {loading ? <Skeleton width="100%" /> : pageTitle}
      </Typography>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {(loading ? Array.from(new Array(4)) : products.slice(0, 4)).map(
            (product, index) => (
              <Grid item key={product?.id || index} size={3}>
                <Card
                  sx={{
                    height: "100%",
                  }}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={140} />
                  ) : (
                    // <Box
                    //   component="img"
                    //   src={product.thumbnail}
                    //   alt={product.title}
                    //   sx={{
                    //     height: 140,
                    //     objectFit: "cover",
                    //     display: "flex",
                    //     margin: "0 auto",
                    //   }}
                    // />
                    <LazyImage
          // height="140"
          height="200" // Fixed height
          src={product.thumbnail}
          alt={product.title}
        />
                  )}
                  <CardContent>
                    <Typography variant="h6">
                      {loading ? <Skeleton width="80%" /> : product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {loading ? <Skeleton width="60%" /> : product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>
      <Box sx={{ textAlign: "center", mt: 3, mb: 5 }}>
        {loading ? (
          <Skeleton variant="rectangular" width="10%" height={40} sx={{ mx: "auto" }} />
        ) : (
          <Button variant="outlined"><Link sx={{ textDecoration: "none" }} component={RouterLink} to="/categoryPage">View All</Link></Button>
        )}
      </Box>
    </>
  );
}

export default Products;
