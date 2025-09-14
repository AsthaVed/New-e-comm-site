import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const data = { email: "", password: "" };
  const [loginData, setLoginData] = useState(data);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    console.log("target", e.target);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!loginData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    if (validateForm()) {
      if (
        loginData.email === "user@example.com" &&
        loginData.password === "password"
      ) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleLogout = (e) => {
    setIsAuthenticated(false);
    setLoginData({ email: "", password: "" }); // Reset form data on logout
    setErrors({ email: "", password: "" });
  };

  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isAuthenticated ? "Welcome" : "Login"}
            </Typography>
            {!isAuthenticated ? (
              <>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={loginData.email}
                  onChange={handleInput}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  name="password"
                  fullWidth
                  margin="normal"
                  value={loginData.password}
                  onChange={handleInput}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "10px",
                      backgroundColor: "black",
                      "&:hover": { backgroundColor: "#333" },
                    }}
                    style={{ marginTop: "10px" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Box>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;

// gutterBottom: Adds margin below the text.
// <Card> & <CardContent>
// Card: Wraps the login/logout form in a styled box.
// CardContent: Adds padding inside the card.
  /* <Container maxWidth="sm" style={{ marginTop: "50px" }}> */
// A Material-UI Container that centers the form.