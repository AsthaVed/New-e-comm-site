import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

export default function ProductCard({ product }) {
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
        component={Link}
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
      <CardContent>
        <Typography
          component={Link}
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
        <Typography color="text.secondary">${product.price}</Typography>
        <Button
          component={Link}
          to={`/product/${product.sku}`}
          variant="outlined"
          size="small"
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
