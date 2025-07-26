import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  Paper,
  Stack,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  ExitToApp as LogoutIcon,
  Business as BusinessIcon,
  AccessTime as TimeIcon,
  Send as SendIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

function ApplicantDashboard() {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const token = localStorage.getItem("token");
  const [applicantId, setApplicant] = useState("");
  const [status] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoggedInUser = async () => {
    try {
      const res = await axios.get(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/user/getUserInfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplicant(res.data.id);
    } catch (error) {
      console.error("Failed to get user info:", error);
    }
  };

  const handleJobCreation = async (jobId, companyId) => {
    setLoading(true);
    try {
      await axios.post(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/application/create`,
        {
          applicantId,
          jobPostId: jobId,
          campanyId: companyId,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Application Sent successfully");
    } catch (error) {
      console.error("Error sending application:", error);
      alert("Failed to send application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  useEffect(() => {
    axios
      .get("https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/application", {
        params: { page, size },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfo(res.data.content))
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, [page, size, token]);

  const navItems = [
    { text: "Profile Settings", path: "/asetting", icon: <PersonIcon />, color: "#6366f1" },
    { text: "My Applications", path: "/viewapplication", icon: <AssignmentIcon />, color: "#10b981" },
    {
      text: "Logout",
      action: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      icon: <LogoutIcon />, color: "#ef4444",
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: alpha("#ffffff", 0.2), mx: "auto", mb: 2 }}>
            <WorkIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Job Portal</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Applicant Dashboard</Typography>
        </Box>
        <Divider sx={{ bgcolor: alpha("#ffffff", 0.1) }} />
        <List sx={{ px: 2, py: 1 }}>
          {navItems.map(({ text, path, action, icon, color }) => (
            <ListItem key={text} disablePadding sx={{ mb: 1 }}>
              {path ? (
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: alpha("#ffffff", 0.1),
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ mr: 2, color }}>{icon}</Box>
                  <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={action}
                  sx={{
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: alpha("#ffffff", 0.1),
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ mr: 2, color }}>{icon}</Box>
                  <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: "white", borderBottom: "1px solid #e2e8f0", color: "#1e293b" }}>
          <Toolbar>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Available Opportunities</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip
              label={`${Array.isArray(info) ? info.length : 0} Jobs Available`}
              sx={{ bgcolor: "#dbeafe", color: "#1e40af", fontWeight: 600 }}
            />
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 4 }}>
          {Array.isArray(info) && info.length > 0 ? (
            <Grid container spacing={3}>
              {info.map((job, i) => (
                <Fade in={true} timeout={300 + i * 100} key={i}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        border: "1px solid #e2e8f0",
                        borderRadius: 3,
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ bgcolor: "#667eea", width: 48, height: 48 }}>
                              <BusinessIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {job.title || "No Title"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Company ID: {job.companyId}
                              </Typography>
                            </Box>
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              size="small"
                              label={job.isApproved || "Pending"}
                              color={job.isApproved === "Approved" ? "success" : "warning"}
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label="Full-time"
                              sx={{ bgcolor: "#f1f5f9", color: "#475569" }}
                            />
                          </Stack>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <TimeIcon sx={{ fontSize: 16, color: "#64748b" }} />
                            <Typography variant="body2" color="text.secondary">Posted recently</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          startIcon={<SendIcon />}
                          onClick={() => handleJobCreation(job.id, job.companyId)}
                          disabled={loading}
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            "&:hover": {
                              background: "linear-gradient(135deg, #5a67d8 0%, #6b5b95 100%)",
                            },
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fade>
              ))}
            </Grid>
          ) : (
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                bgcolor: "white",
                borderRadius: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <WorkIcon sx={{ fontSize: 64, color: "#94a3b8", mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#475569" }}>
                No Job Posts Available
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Check back later for new opportunities that match your profile.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ApplicantDashboard;
