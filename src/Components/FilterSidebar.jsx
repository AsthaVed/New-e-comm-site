import React, { useEffect, useState } from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/categorySlice"; // import the thunk
import { useSearchParams } from "react-router-dom";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState([]);
        console.log("categoryyyyy", selectedCategories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  return (
    <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>

      {categories.map((category, index) => (
        <Box key={ index } width="100%">
          <FormControlLabel
            control={
              <Checkbox
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={handleCategoryChange}
                inputProps={{ "data-category": category.name }}
              />
            }
            label={category.name.replace("-", " ")}

          />
        </Box>
      ))}
    </Box>
  );
}
