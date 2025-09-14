import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/authSlice"; // Import actions
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
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function FormikLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access Redux state
  const dispatch = useDispatch(); // Get dispatch function
  // const [errors, setErrors] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    // 👇 Redirect to home if already authenticated
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/"); // Redirect to home
      }
    }, [isAuthenticated, navigate]);

  // const validateForm = () => {
  //   let newErrors = { email: "", password: "" };
  //   let isValid = true;

  //   if (!email) {
  //     newErrors.email = "Email is required";
  //     isValid = false;
  //   }
  //   if (!password) {
  //     newErrors.password = "Password is required";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    // if (validateForm()) {
    if (email === "user@example.com" && password === "password") {
      console.log("values", values, email, password);
      dispatch(login({ email: email, password: password })); // Dispatch login action
    } else {
      alert("Invalid credentials");
    }
    // }
    setSubmitting(false);
    navigate("/");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isAuthenticated ? "Welcome" : "Login"}
          </Typography>
          {/* {!isAuthenticated ? ( */}
            <>
              <Formik
                initialValues={{ email: "", password: "" }}
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
                      label="Email"
                      fullWidth
                      name="email"
                      margin="normal"
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
                      name="password"
                      margin="normal"
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
                              {showPassword ? (
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
                        Login
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                      <Typography variant="body2">
                        Don't have an account?{" "}
                        <Link component={RouterLink}
                          variant="body2"
                          to="/signup"
                          // onClick={() => navigate("/signup")}
                        >
                          Sign up here
                        </Link>
                      </Typography>
                    </Box>
            </>
          {/* ) : (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => dispatch(logout())} // Dispatch logout action
            >
              Logout
            </Button>
          )} */}
        </CardContent>
      </Card>
    </Container>
  );
}

export default FormikLogin;