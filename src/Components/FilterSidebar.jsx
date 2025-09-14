import React, { useEffect, useState } from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/categorySlice"; // import the thunk
import { useSearchParams } from "react-router-dom";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.categories);
  console.log("categoriessss", categories);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
        console.log("categoryyyyy", selectedCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sync selected categories with URL params
  useEffect(() => {
    const urlCategories = searchParams.getAll("category");
    setSelectedCategories(urlCategories);
  }, [searchParams]);

   // Handle checkbox change and update URL
  const handleCategoryChange = (event) => {
    // const { value, checked } = event.target;
    const checked = event.target.checked;
    const category = event.target.getAttribute("data-category");
    let updated = [];

    if (checked) {
      updated = [...selectedCategories, category];
    } else {
      updated = selectedCategories.filter((cat) => cat !== category);
    }

    setSelectedCategories(updated);

    // Update URL search params
    const newParams = new URLSearchParams();
    // console.log("newParams", newParams);
    updated.forEach((cat) => newParams.append("category", cat));
    setSearchParams(newParams);
  };

  return (
    <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      
       {categories.map((category, index) => {
        const catName = typeof category === "string" ? category : category.slug;
        return (
          <Box key={catName || index} width="100%">
            <FormControlLabel
              control={
                <Checkbox
                  value={catName}
                  checked={selectedCategories.includes(catName)}
                  onChange={handleCategoryChange}
                  inputProps={{ "data-category": catName }}
                />
              }
              label={catName.replace("-", " ")}
            />
          </Box>
        );
      })}
    </Box>
  );
}