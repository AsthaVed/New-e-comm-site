import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export default function ProductCard({ product }) {

  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card key={product.id}
    sx={{ width: "250px" }}>
      <CardMedia
        component="img"
        // height="140"
        height="200" // Fixed height
        image={product.images[0]}
        alt={product.title}
        style={{
          width: "100%",         // Makes it fill the card width
          objectFit: "cover",    // Crops image nicely to fit
        }}
      />
      <CardContent>
        <Typography variant="h6" noWrap
  sx={{
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }}>{truncateText(product.title, 25)}</Typography>
        <Typography color="text.secondary">${product.price}</Typography>
        <Button variant="outlined" size="small">View</Button>
      </CardContent>
    </Card>
  );
}
