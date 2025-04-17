import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Box,
  Button,
} from "@mui/material";
import Products from "./Products";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
      {loading ? (
        <>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "20%",
            }}
          >
            <Skeleton variant="text" width={100} height={50} />
            <Skeleton variant="text" width={100} height={50} />
            <Skeleton variant="text" width={100} height={50} />
            <Skeleton variant="text" width={100} height={50} />
            <Skeleton variant="text" width={100} height={50} />
          </Box>
        </>
      ) : (
        <>
          <Box
            component="img"
            src="https://tse4.mm.bing.net/th?id=OIP.4MblWAkWSOMRONq3xQBwmwAAAA&pid=Api"
            alt="Banner"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container>
              <Box sx={{ color: "white", maxWidth: 500 }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="black"
                  gutterBottom
                >
                  Discover Your Style
                </Typography>
                <Typography variant="h6" gutterBottom color="black">
                  Shop the latest trends and exclusive collections
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, px: 4, py: 1 }}
                  href="/shop"
                >
                  Shop Now
                </Button>
              </Box>
            </Container>
          </Box>

          <Box
            sx={{
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "20%",
              marginBottom: "4%",
            }}
          >
            <Typography variant="p" color="white">
              PRADA
            </Typography>
            <Typography variant="p" color="white">
              Versace
            </Typography>
            <Typography variant="p" color="white">
              Zara
            </Typography>
            <Typography variant="p" color="white">
              Zucci
            </Typography>
            <Typography variant="p" color="white">
              Calvin Klein
            </Typography>
          </Box>
          <Products pageTitle="NEW ARRIAVALS" />
          <Products pageTitle="TOP SELLING" />

          <Container>
            <Card>
              <CardContent>
                <Box sx={{textAlign: "center", fontWeight: "bold", mt: 2 }}>
                <Typography variant="h3" sx={{width: "100%", fontWeight: "bold"}}>BROWSE BY DRESS STYLE</Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", gap: 2, margin: "0 auto", width: "80%", flexWrap: "wrap", background: "gray",  padding: "18px", borderRadius: "8px", mt: 4}}>
          <Box
            component="img"
            src="https://tse4.mm.bing.net/th?id=OIP.4MblWAkWSOMRONq3xQBwmwAAAA&pid=Api"
            alt="Banner" sx={{ width: "35%", borderRadius: 2, objectFit: "cover" }}
          />
          <Box
            component="img"
            src="https://tse4.mm.bing.net/th?id=OIP.4MblWAkWSOMRONq3xQBwmwAAAA&pid=Api"
            alt="Banner" sx={{ width: "55%", borderRadius: 2, objectFit: "cover" }}
          />
          <Box
            component="img"
            src="https://tse4.mm.bing.net/th?id=OIP.4MblWAkWSOMRONq3xQBwmwAAAA&pid=Api"
            alt="Banner" sx={{ width: "55%", borderRadius: 2, objectFit: "cover" }}
          />
          <Box
            component="img"
            src="https://tse4.mm.bing.net/th?id=OIP.4MblWAkWSOMRONq3xQBwmwAAAA&pid=Api"
            alt="Banner" sx={{ width: "35%", borderRadius: 2, objectFit: "cover" }}
          />
                </Box>
              </CardContent>
            </Card>

            <Typography
                    variant="h3"
                    sx={{
                      mt: 8,
                      mb: 4,
                      width: "100%",
                      padding: "0px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {loading ? <Skeleton width="100%" /> : "OUR HAPPY CUSTOMERS"}
                  </Typography>
                  <Box sx={{display: "flex", gap: 5, justifyContent: "center", mb: 7}}>
                  < ReviewCard name="Sarah M." />
                  < ReviewCard name="James L." />
                  < ReviewCard name="Alex K." />
                  < ReviewCard name="Ronal D." />
                  </Box>
          </Container>

          < Footer />
        </>
      )}
    </Box>
  );
};

export default HomePage;
