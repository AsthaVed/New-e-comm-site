import React, { useEffect } from 'react';
import FilterSidebar from '../Components/FilterSidebar';
import ProductCard from '../Components/ProductCard';
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productSlice";

function CategoryPage() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box p={2}>
      {/* Layout: Sidebar and Products side by side */}
      <Box display="flex" gap={2}>
        {/* Sidebar */}
        <Box flex="1" maxWidth="250px">
          <FilterSidebar />
        </Box>

        {/* Product List */}
        <Box flex="3">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default CategoryPage;
