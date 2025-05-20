import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LazyImage from "./LazyImage";
import { addToCart } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card key={product.sku} sx={{ width: "250px" }}>
      {/* <CardMedia
        component="img"
        loading="lazy"
        // height="140"
        height="200" // Fixed height
        image={product.images[0]}
        alt={product.title}
        style={{
          width: "100%", // Makes it fill the card width
          objectFit: "cover", // Crops image nicely to fit
        }}
      /> */}

      <Typography
        component={RouterLink}
        to={`/product/${product.sku}`}
        style={{ display: "block" }}
      >
        <LazyImage
          // height="140"
          height="200" // Fixed height
          src={product.images[0]}
          alt={product.title}
        />
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component={RouterLink}
          to={`/product/${product.sku}`}
          variant="h6"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "black",
          }}
        >
          {truncateText(product.title, 20)}
        </Typography>
        <Typography component={RouterLink} to={`/product/${product.sku}`} color="text.secondary">${product.price}</Typography>
        <Box mt={1} sx={{display: "flex", justifyContent: "space-around"}}>
        <Button p={6}
          component={RouterLink}
          to={`/product/${product.sku}`}
          variant="outlined"
          size="small"
          sx={{ width: '40%' }}
        >
          View
        </Button>
        <Button p={6}
          variant="contained" onClick={() => {dispatch(addToCart(product)); toast.success('Item added to cart!');}}
          size="small"
        >
         Add to Cart
        </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
