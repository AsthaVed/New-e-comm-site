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

function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const data = { name: "", email: "", password: "", confirmPassword: "" };
  const [signupData, setSignupData] = useState(data);

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
      setErrors({ name: "", email: "", password: "", confirmPassword: "" });
      alert("Signup successful!");
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset form data on logout  
    }
  };

  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isRegistered ? "Registration Successfull" : "Signup"}
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              margin="normal"
              fullWidth
              value={signupData.name}
              onChange={handleInput}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              margin="normal"
              fullWidth
              value={signupData.email}
              onChange={handleInput}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              fullWidth
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
              label="ConfirmPassword"
              variant="outlined"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              fullWidth
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
                  "&:hover": { backgroundColor: "#333" }
                }}
                onClick={handleSignup}
              >
                Signup
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default SignupPage;
