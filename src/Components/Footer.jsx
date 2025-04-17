import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Skeleton,
  Box,
  IconButton,
  Link,
  Tooltip,
  TextField,
  InputAdornment,
  Container,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

function Footer() {
  return (
    <>
      {/* <Container> */}
      <Box sx={{ width: "100%", position: "absolute", zIndex: 2 }}>
        <Box
          sx={{
            width: "50%",
            background: "black",
            display: "flex",
            margin: "0px auto",
            borderRadius: "10px",
            padding: "15px 30px",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
            <Typography variant="h5" color="white">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </Typography>
          </Box>
          <Box sx={{ width: "40%"}}>
            <Box sx={{ display: "flex" }}>
              {/* <IconButton aria-label="email" >
                <MailOutlinedIcon  />
              </IconButton> */}
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                name="email"
                // value={signupData.name}
              />
            </Box>

            <Button variant="contained" color="primary" sx={{ color: "white", display: "flex", margin: "0 auto" }}>
              Subscribe to Newsletter
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          background: "#a3a3a3",
          position: "relative",
          zIndex: 1,
          top: "70px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 6,
          }}
        >
          <Box sx={{ width: "28%", p: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              MyShop
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam consequat.
            </Typography>
            <Typography>
              <IconButton aria-label="check">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="check">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="check">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="check">
                <LinkedInIcon />
              </IconButton>
            </Typography>
          </Box>
          <Box sx={{ width: "18%", p: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              COMPANY
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="p">About</Typography>
              <Typography variant="p">Features</Typography>
              <Typography variant="p">Works</Typography>
              <Typography variant="p">Career</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "18%", p: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              HELP
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="p">Customer Support</Typography>
              <Typography variant="p">Delivery Details</Typography>
              <Typography variant="p">Terms & Conditions</Typography>
              <Typography variant="p">Privacy Policy</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "18%", p: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              FAQ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="p">Account</Typography>
              <Typography variant="p">Manage Delivers</Typography>
              <Typography variant="p">Orders</Typography>
              <Typography variant="p">Payment</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "18%", p: 5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              RESOURCES
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="p">Free eBooks</Typography>
              <Typography variant="p">Delelopment Tutorial</Typography>
              <Typography variant="p">How to - Blog</Typography>
              <Typography variant="p">Youtube Playlist</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography>Shop @ 2025. All Rights Reserved</Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "end",
              gap: "25px",
            }}
          >
            <IconButton aria-label="Rupee">
              <CurrencyRupeeOutlinedIcon />
            </IconButton>
            <IconButton aria-label="CreditScore">
              <CreditScoreOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Bitcoin">
              <CurrencyBitcoinOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Euro">
              <EuroOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default Footer;
