import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  SecurityUpdate,
  Login as LoginIcon,
  PersonAdd,
} from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      setSuccessMsg("OTP sent to your email. Please check.");
      setOtpSent(true);
      setTimer(60);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginValidation = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otpCode) {
      setErrorMsg("Please enter the OTP code.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/auth/confirm-login?otpCode=${otpCode}`,
        { email }
      );

      const token = res.data;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      setSuccessMsg("Login successful! Redirecting...");

      setTimeout(() => {
        if (userRole === "COMPANY") {
          navigate("/cdashboard");
        } else if (userRole === "APPLICANT") {
          navigate("/adashboard");
        } else {
          navigate("/admin");
        }
      }, 1500);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "OTP verification failed.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResentOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setLoading(true);
      await axios.post(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/auth/login",
        { email, password }
      );
      setSuccessMsg("OTP resent. Please check your email.");
      setTimer(60);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to resend OTP.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      
      {/* Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: "white"
            }}
          >
            Job Portal
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
              sx={{
                color: "#667eea",
                background: "white",
                borderRadius: 2,
                px: 2,
                fontWeight: 600,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                }
              }}
            >
              Login
            </Button>
            
            <Button
              startIcon={<PersonAdd />}
              onClick={() => navigate("/register")}
              sx={{
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 8, // Account for AppBar height
          pb: 2,
          px: 2,
        }}
      >
        <Container maxWidth="xs">
          <Fade in timeout={800}>
            <Paper
              elevation={24}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "100%",
                maxWidth: 380,
                mx: "auto",
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  {otpSent ? (
                    <SecurityUpdate sx={{ fontSize: 30, color: "white" }} />
                  ) : (
                    <LoginIcon sx={{ fontSize: 30, color: "white" }} />
                  )}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 0.5,
                  }}
                >
                  {otpSent ? "Verify OTP" : "Login"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {otpSent
                    ? "Enter the code sent to your email"
                    : "Welcome back! Please sign in to your account"}
                </Typography>
              </Box>

              {/* Alerts */}
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {errorMsg}
                </Alert>
              )}

              {successMsg && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                  {successMsg}
                </Alert>
              )}

              {/* Form */}
              {!otpSent ? (
                <Box>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#667eea", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "#667eea" },
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-focused": { color: "#667eea" },
                    }}
                  />

                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#667eea", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "#667eea" },
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-focused": { color: "#667eea" },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{
                      mt: 2,
                      py: 1.2,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8, #6a42a0)",
                        boxShadow: "0 6px 25px rgba(102, 126, 234, 0.4)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Send OTP"}
                  </Button>

                  {/* Register Button */}
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Don't have an account?
                    </Typography>
                    <Button
                      startIcon={<PersonAdd />}
                      onClick={() => navigate("/register")}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        borderColor: "#667eea",
                        color: "#667eea",
                        "&:hover": {
                          borderColor: "#667eea",
                          background: "rgba(102, 126, 234, 0.04)",
                        },
                      }}
                    >
                      Create Account
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <TextField
                    label="Enter OTP"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={otpCode}
                    onChange={(e) => setOtp(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SecurityUpdate sx={{ color: "#667eea", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "#667eea" },
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-focused": { color: "#667eea" },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    onClick={handleLoginValidation}
                    disabled={loading}
                    sx={{
                      mt: 2,
                      py: 1.2,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8, #6a42a0)",
                        boxShadow: "0 6px 25px rgba(102, 126, 234, 0.4)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Verify OTP"}
                  </Button>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    {timer > 0 ? (
                      <Typography 
                        variant="body2"
                        sx={{
                          color: "#667eea",
                          fontWeight: 500,
                          p: 1.5,
                          borderRadius: 2,
                          background: "rgba(102, 126, 234, 0.1)",
                        }}
                      >
                        Resend OTP in {timer} seconds
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleResentOtp}
                        disabled={loading}
                        sx={{
                          borderRadius: 2,
                          borderColor: "#667eea",
                          color: "#667eea",
                          "&:hover": {
                            borderColor: "#667eea",
                            background: "rgba(102, 126, 234, 0.04)",
                          },
                        }}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </Paper>
          </Fade>
        </Container>
      </Box>
    </>
  );
}

export default Login;