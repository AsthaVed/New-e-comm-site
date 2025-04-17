import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/authSlice"; // Import actions
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ReduxLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access Redux state
  const dispatch = useDispatch(); // Get dispatch function
  const [errors, setErrors] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
    if (email === "user@example.com" && password === "password") {
      dispatch(login({ email })); // Dispatch login action
    } else {
      alert("Invalid credentials");
    }
  }
  };

  return (
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
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => dispatch(logout())} // Dispatch logout action
            >
              Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default ReduxLogin;
