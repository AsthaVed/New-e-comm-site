import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice"; // Import login action
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

function ReduxSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch(); // Get dispatch function
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleInput = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!signupData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      }
    // Email validation (Regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!signupData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Strong password validation (Regex)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!signupData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(signupData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character";
      isValid = false;
    }

    // Confirm Password Validation
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    if (validateForm()) {
      setIsRegistered(true);
    // if (signupData.password === signupData.confirmPassword) {
      dispatch(login({ email: signupData.email })); // Dispatch login action
      alert("Signup successful!");
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    // } else {
    //   alert("Passwords do not match");
    // }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
          {isRegistered ? "Registration Successfull" : "Signup"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={signupData.name}
            onChange={handleInput}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={signupData.email}
            onChange={handleInput}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            name="password"
            value={signupData.password}
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
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleInput}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>
            <Button variant="contained" onClick={handleSignup}>
              Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ReduxSignup;
