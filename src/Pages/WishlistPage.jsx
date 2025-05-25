import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../Redux/wishlistSlice";
import { Typography, Container, Grid, Card, CardContent, Button } from "@mui/material";

function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h4" my={4}>Your Wishlist</Typography>
      <Grid container spacing={2}>
        {wishlist.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Button
                  color="secondary"
                  onClick={() => dispatch(removeFromWishlist(item))}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default WishlistPage;
