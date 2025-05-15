import React, { useEffect, useState } from "react";
import FilterSidebar from "../Components/FilterSidebar";
import ProductCard from "../Components/ProductCard";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import "../assets/Pagination.css";

function CategoryPage() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  console.log("items", products);

  const [tableData, setTableData] = useState();
  console.log("tableData", tableData);
  const [currentPage, setCurrentPage] = useState(1); // current page value set
  const [rowsPerPage, setRowsParPage] = useState(12); //how many records display per page
  // for extracting 10 records from all records
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = tableData?.slice(indexOfFirstItem, indexOfLastItem); //get 10 items
  console.log("currentIems", currentItems);
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);

  // The useEffect callback function cannot be async. Instead, use an inner async function inside useEffect.

  // useEffect(() => {
  //   // dispatch(fetchProducts())
  //   async () => {
  //   const resultAction = await dispatch(fetchProducts());
  //   // Assuming resultAction.payload contains the data (typical in createAsyncThunk)
  //   setTableData(resultAction.payload);
  // };

  // // fetchData();
  // }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchProducts());
      setTableData(resultAction.payload);
    };

    fetchData(); // <-- call the async function
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
            {/* {currentItems?.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))} */}
            {!currentItems || currentItems.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  marginTop: "2rem",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              currentItems.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
      {currentItems?.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              onClick={() => handlePageClick(index + 1)}
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </Box>
  );
}

export default CategoryPage;
