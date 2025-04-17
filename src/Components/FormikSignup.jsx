import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice"; // Import login action
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "@mui/material/Link";
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

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Username too short!")
    .max(15, "Username too long!")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/[0-9]/, "Password must contain numbers")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function FormikSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  // const [signupData, setSignupData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const auth = useSelector((state) => state.auth);
  console.log("Redux Auth State:", auth);
  const dispatch = useDispatch(); // Get dispatch function
  // const [errors, setErrors] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleInput = (e) => {
  //   setSignupData({ ...signupData, [e.target.name]: e.target.value });
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

    // 👇 Redirect to home if already authenticated
    useEffect(() => {
      if (auth.isAuthenticated) {
        navigate("/"); // Redirect to home
      }
    }, [auth.isAuthenticated, navigate]);

  // const validateForm = () => {
  //   let newErrors = { name: "", email: "", password: "", confirmPassword: "" };
  //   let isValid = true;

  //   if (!signupData.name) {
  //       newErrors.name = "Name is required";
  //       isValid = false;
  //     }
  //   // Email validation (Regex)
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!signupData.email) {
  //     newErrors.email = "Email is required";
  //     isValid = false;
  //   } else if (!emailRegex.test(signupData.email)) {
  //     newErrors.email = "Enter a valid email address";
  //     isValid = false;
  //   }

  //   // Strong password validation (Regex)
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   if (!signupData.password) {
  //     newErrors.password = "Password is required";
  //     isValid = false;
  //   } else if (!passwordRegex.test(signupData.password)) {
  //     newErrors.password =
  //       "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character";
  //     isValid = false;
  //   }

  //   // Confirm Password Validation
  //   if (!signupData.confirmPassword) {
  //     newErrors.confirmPassword = "Confirm Password is required";
  //     isValid = false;
  //   } else if (signupData.password !== signupData.confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // if (validateForm()) {
    setIsRegistered(true);
    // if (signupData.password === signupData.confirmPassword) {
    console.log("values", values);
    dispatch(
      login({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    ); // Dispatch login action
    setSubmitting(false);
    alert("Signup successful!");
    resetForm(); // ✅ reset the form fields
    navigate("/");
    // setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    // } else {
    //   alert("Passwords do not match");
    // }
    // }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isRegistered ? "Registration Successfull" : "Signup"}
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              isSubmitting,
            }) => (
              <Form>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
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
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Signup
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link component={RouterLink}
                      variant="body2"
                      to="/login"
                      // onClick={() => navigate("/login")}
                    >
                      Login here
                    </Link>
                  </Typography>
                </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FormikSignup;
