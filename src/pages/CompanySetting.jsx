import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Paper,
  Card,
  CardContent,
  Container,
  Grid,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Fade,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Web as WebIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Save as SaveIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

function CompanySetting() {
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

  useEffect(() => {
    const fetchUserAndCompany = async () => {
      try {
        setErrorMsg("");
        const res = await axios.get(
          "https://spring-boot-jobportal-system-devops-2.onrender.com/api/user/getUserInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const id = res.data.id;
        setUserId(id);

        const companyRes = await axios.get(
          `https://spring-boot-jobportal-system-devops-2.onrender.com/api/company/getcampanybyid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = companyRes.data;
        setCompanyName(data.companyName || "");
        setLogoPath(data.logoPath || "");
        setDescription(data.description || "");
        setWebsite(data.website || "");
      } catch (err) {
        setErrorMsg(
          err.response?.data?.message ||
            "Failed to fetch user/company information."
        );
      }
    };

    fetchUserAndCompany();
  }, [token]);

  const handleCompanyUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!companyName || !logoPath || !description || !website) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/company/update/${userId}`,
        {
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
      setSuccessMsg("Company profile updated successfully!");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to update company profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { text: "Dashboard", path: "/cdashboard", icon: <DashboardIcon /> },
    { text: "Company Settings", path: "/csetting", icon: <SettingsIcon />, active: true },
    { text: "Applied Jobs", path: "/appliedJob", icon: <AssignmentIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Company Portal - Settings
          </Typography>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
            <PersonIcon />
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRight: "none",
            boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "2rem",
            }}
          >
            <BusinessIcon fontSize="large" />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Company Portal
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Settings & Configuration
          </Typography>
        </Box>

        <List sx={{ px: 2, py: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={item.path ? Link : "div"}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  color: "white",
                  background: item.active ? "rgba(255,255,255,0.2)" : "transparent",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                    transform: "translateX(8px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mr: 2, minWidth: 24 }}>{item.icon}</Box>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: item.active ? "bold" : "normal",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Fade in timeout={800}>
            <Box>
              {/* Header Section */}
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#2c3e50",
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Company Settings
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "#7f8c8d",
                    mb: 3,
                  }}
                >
                  Update your company profile and information
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    component={Link}
                    to="/cdashboard"
                    variant="contained"
                    startIcon={<HomeIcon />}
                    sx={{
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Go to Home
                  </Button>
                  <Button
                    component={Link}
                    to="/appliedJob"
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    sx={{
                      background: "linear-gradient(45deg, #764ba2, #667eea)",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      boxShadow: "0 4px 15px rgba(118, 75, 162, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #6a4190, #5a6fd8)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(118, 75, 162, 0.6)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Applied Job
                  </Button>
                </Stack>
              </Paper>

              <Grid container spacing={4} justifyContent="center">
                {/* Company Profile Form */}
                <Grid item xs={12} md={8} lg={6}>
                  <Card
                    elevation={12}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            mx: "auto",
                            mb: 2,
                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                            fontSize: "3rem",
                          }}
                        >
                          <BusinessIcon fontSize="large" />
                        </Avatar>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: "#2c3e50",
                            mb: 1,
                          }}
                        >
                          {companyName || "Company Profile"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Update your company information
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 3 }} />

                      {errorMsg && (
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            borderRadius: 2,
                            "& .MuiAlert-icon": {
                              fontSize: "1.5rem",
                            },
                          }}
                        >
                          {errorMsg}
                        </Alert>
                      )}
                      {successMsg && (
                        <Alert
                          severity="success"
                          sx={{
                            mb: 3,
                            borderRadius: 2,
                            "& .MuiAlert-icon": {
                              fontSize: "1.5rem",
                            },
                          }}
                        >
                          {successMsg}
                        </Alert>
                      )}

                      <form onSubmit={handleCompanyUpdate} noValidate>
                        <TextField
                          label="Company Name"
                          fullWidth
                          required
                          margin="normal"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <BusinessIcon sx={{ mr: 1, color: "#667eea" }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                              },
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
                          disabled={loading}
                          InputProps={{
                            startAdornment: <ImageIcon sx={{ mr: 1, color: "#667eea" }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Company Description"
                          fullWidth
                          required
                          margin="normal"
                          multiline
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <DescriptionIcon sx={{ mr: 1, color: "#667eea", alignSelf: "flex-start", mt: 1 }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Company Website"
                          fullWidth
                          required
                          margin="normal"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <WebIcon sx={{ mr: 1, color: "#667eea" }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                              },
                            },
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          disabled={loading}
                          startIcon={loading ? null : <SaveIcon />}
                          sx={{
                            mt: 4,
                            py: 2,
                            borderRadius: 3,
                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                            },
                            "&:disabled": {
                              background: "linear-gradient(45deg, #ccc, #999)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            "Update Company Profile"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Company Preview */}
                <Grid item xs={12} md={8} lg={6}>
                  <Card
                    elevation={12}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          fontWeight: "bold",
                          color: "#2c3e50",
                          textAlign: "center",
                        }}
                      >
                        Company Preview
                      </Typography>

                      <Divider sx={{ mb: 3 }} />

                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: "linear-gradient(135deg, #667eea15, #764ba215)",
                          border: "1px solid rgba(102, 126, 234, 0.2)",
                        }}
                      >
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              mx: "auto",
                              mb: 2,
                              background: "linear-gradient(45deg, #667eea, #764ba2)",
                            }}
                          >
                            <BusinessIcon fontSize="large" />
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50", mb: 1 }}>
                            {companyName || "Your Company Name"}
                          </Typography>
                          {website && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#667eea",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                              component="a"
                              href={website}
                              target="_blank"
                            >
                              <WebIcon fontSize="small" />
                              {website}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}>
                            Company Description:
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#7f8c8d", lineHeight: 1.6 }}>
                            {description || "Company description will appear here..."}
                          </Typography>
                        </Box>

                        {logoPath && (
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50" }}>
                              Logo Path:
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#7f8c8d", wordBreak: "break-all" }}>
                              {logoPath}
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}

export default CompanySetting;