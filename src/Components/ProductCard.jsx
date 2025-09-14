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
import { addToWishlist, removeFromWishlist } from "../Redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";


export default function ProductCard({ product }) {

  const wishlist = useSelector((state) => state.wishlist.items);
const isInWishlist = wishlist.some((item) => item.sku === product.sku);

const handleWishlistToggle = () => {
  if (isInWishlist) {
    dispatch(removeFromWishlist(product));
    toast.info("Removed from wishlist");
  } else {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  }
};


  const dispatch = useDispatch();
  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Box sx={{ position: "relative", width: "250px" }}>
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
       <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
  <IconButton
    onClick={handleWishlistToggle}
  >
    {isInWishlist ? (
      <FavoriteIcon color="error" />
    ) : (
      <FavoriteBorderIcon />
    )}
  </IconButton>
</Box>

      <Typography
        component={RouterLink}
        to={`/product/${product.sku}`}
        style={{ display: "block" }}
      >
        <LazyImage
          height="200" // Fixed height
          src={product.images[0]}
           alt={`Image of ${product.title}`}
        />
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        {/* Add title attribute on links to show full name on hover */}
        <Typography
          component={RouterLink}
          to={`/product/${product.sku}`}
          variant="h6"
          noWrap
          title={product.title}
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
        <Button
          component={RouterLink}
          to={`/product/${product.sku}`}
          variant="outlined"
          size="small"
          sx={{ width: '40%', p: 1 }}
        >
          View
        </Button>
        <Button sx={{ p: 1 }}
          variant="contained" onClick={() => {dispatch(addToCart(product)); toast.success('Item added to cart!');}}
          size="small"
        >
         Add to Cart
        </Button>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
}