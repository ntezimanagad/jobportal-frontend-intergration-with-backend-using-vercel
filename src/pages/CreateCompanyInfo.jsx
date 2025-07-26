import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
  InputAdornment,
  Fade,
  AppBar,
  Toolbar,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Business,
  Image,
  Description,
  Language,
  Person,
  CheckCircle,
} from "@mui/icons-material";

function CreateCompanyInfo() {
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logoPath, setLogoPath] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [approved] = useState("PENDING");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Fetch logged in user info on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          "https://spring-boot-jobportal-system-devops-2.onrender.com/api/user/getUserInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserId(res.data.id);
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message || "Failed to fetch user info."
        );
      }
    }
    fetchUser();
  }, [token]);

  const handleCompany = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!companyName || !logoPath || !description || !website) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/company/create",
        {
          userId,
          companyName,
          logoPath,
          description,
          website,
          approved,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Company profile created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to create company profile."
      );
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
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
        }}
      >
        <Toolbar>
          <Business sx={{ mr: 2 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              flexGrow: 1,
              color: "white"
            }}
          >
            Company Profile Setup
          </Typography>
          
          <Button
            startIcon={<Person />}
            onClick={() => navigate("/login")}
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
            Back to Login
          </Button>
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
          pt: 10, // Account for AppBar height
          pb: 4,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Fade in timeout={800}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
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
                  <Business sx={{ fontSize: 40, color: "white" }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Create Company Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Complete your company information to get started
                </Typography>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 1,
                    color: "text.secondary"
                  }}
                >
                  <CheckCircle sx={{ fontSize: 16, color: "#ffa726" }} />
                  <Typography variant="body2">
                    Status: {approved}
                  </Typography>
                </Box>
              </Box>

              {/* Alerts */}
              {errorMsg && (
                <Fade in>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      "& .MuiAlert-icon": {
                        color: "#d32f2f",
                      },
                    }}
                  >
                    {errorMsg}
                  </Alert>
                </Fade>
              )}

              {successMsg && (
                <Fade in>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      "& .MuiAlert-icon": {
                        color: "#2e7d32",
                      },
                    }}
                  >
                    {successMsg}
                  </Alert>
                </Fade>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleCompany} noValidate>
                <TextField
                  label="Company Name"
                  fullWidth
                  required
                  margin="normal"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                    "& .MuiInputLabel-focused": {
                      color: "#667eea",
                    },
                  }}
                />

                <TextField
                  label="Logo Path"
                  fullWidth
                  required
                  margin="normal"
                  value={logoPath}
                  onChange={(e) => setLogoPath(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                    "& .MuiInputLabel-focused": {
                      color: "#667eea",
                    },
                  }}
                />

                <TextField
                  label="Description"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your company..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                        <Description sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                    "& .MuiInputLabel-focused": {
                      color: "#667eea",
                    },
                  }}
                />

                <TextField
                  label="Website"
                  fullWidth
                  required
                  margin="normal"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.yourcompany.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                    "& .MuiInputLabel-focused": {
                      color: "#667eea",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(45deg, #5a6fd8, #6a42a0)",
                      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      background: "rgba(0, 0, 0, 0.12)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    <>
                      <CheckCircle sx={{ mr: 1 }} />
                      Create Profile
                    </>
                  )}
                </Button>
              </Box>

              {/* Footer Info */}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Your profile will be reviewed and approved by our team
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </>
  );
}

export default CreateCompanyInfo;