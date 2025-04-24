import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function FilterSidebar() {
  const categories = ["Electronics", "Clothing", "Books", "Home"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
    }

    // Optional: Call props.onFilterChange(selectedCategories) here
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>

      {categories.map((category) => (
        <Box key={category} width="100%"> 
          <FormControlLabel
          control={
            <Checkbox
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
          }
          label={category}
        />
        </Box>
      ))}
    </Box>
  );
}



      // <FormControlLabel control={<Checkbox />} label="In Stock" />
      // <FormControlLabel control={<Checkbox />} label="On Sale" />


