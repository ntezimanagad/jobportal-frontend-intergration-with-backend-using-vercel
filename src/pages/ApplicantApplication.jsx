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
  Divider,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Container,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import {
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
  Assignment as AssignmentIcon,
  Work as WorkIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

function ApplicantApplication() {
  const [info, setInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const token = localStorage.getItem("token");
  const [applicantId, setApplicant] = useState("");
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

  const getApplicantById = async (id) => {
    try {
      const res = await axios.get(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/applicant/getapplicantbyid/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplicantInfo([res.data]);
    } catch (error) {
      console.error("Error fetching applicant info:", error);
    }
  };

  const getJobById = async (id) => {
    try {
      const res = await axios.get(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/getjobbyid/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobInfo([res.data]);
    } catch (error) {
      console.error("Error fetching job info:", error);
    }
  };

  const deleteApplication = async (jobId) => {
    try {
      await axios.delete(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/application/delete/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Application deleted successfully");
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const fetchApplications = () => {
    axios
      .get("https://spring-boot-jobportal-system-devops-2.onrender.com/api/application/myapplication", {
        params: { page, size },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInfo(res.data.content))
      .catch((err) => {
        console.error("Error fetching applications:", err);
      });
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [page, size]);

  const navItems = [
    { 
      text: "Profile Settings", 
      path: "/asetting",
      icon: <PersonIcon />,
      color: "#6366f1"
    },
    { 
      text: "Dashboard", 
      path: "/adashboard",
      icon: <DashboardIcon />,
      color: "#8b5cf6"
    },
    {
      text: "Logout",
      action: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      icon: <LogoutIcon />,
      color: "#ef4444"
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
  <Box
    sx={{
      display: "flex",
      bgcolor: "#f8fafc",
      height: "100vh",      // full viewport height
      width: "100vw",       // full viewport width
      overflow: "hidden",   // prevent body scroll
    }}
  >
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
          height: "100vh",   // full viewport height
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "rgba(255,255,255,0.2)",
            mx: "auto",
            mb: 2,
            backdropFilter: "blur(10px)",
          }}
        >
          <AssignmentIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Applicant Panel
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          My Applications
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
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
                    bgcolor: "rgba(255,255,255,0.1)",
                    transform: "translateX(4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mr: 2, color: color }}>{icon}</Box>
                <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={action}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    transform: "translateX(4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mr: 2, color: color }}>{icon}</Box>
                <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>

    {/* Main content */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",      // full viewport height
        overflowY: "auto",    // scrollable content
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e2e8f0",
          color: "#1e293b",
          zIndex: (theme) => theme.zIndex.drawer + 1, // above drawer
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
            My Applications
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label={`${Array.isArray(info) ? info.length : 0} Applications`}
            sx={{
              bgcolor: "#dbeafe",
              color: "#1e40af",
              fontWeight: 600,
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // allow children to scroll inside
        }}
      >
        {Array.isArray(info) && info.length > 0 ? (
          <Grid container spacing={3}>
            {info.map((application, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
                      borderColor: "#a855f7",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <AssignmentIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#1e293b",
                              lineHeight: 1.2,
                            }}
                          >
                            Application #{application.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Applied: {new Date(application.appliedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        size="small"
                        label={application.status}
                        color={getStatusColor(application.status)}
                        variant="outlined"
                        sx={{
                          fontWeight: 500,
                          alignSelf: "flex-start",
                        }}
                      />
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0, flexDirection: "column", gap: 1 }}>
                    <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PersonIcon />}
                        onClick={() => getApplicantById(application.applicantId)}
                        sx={{ flex: 1 }}
                      >
                        Applicant
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<WorkIcon />}
                        onClick={() => getJobById(application.jobPostId)}
                        sx={{ flex: 1 }}
                      >
                        Job Info
                      </Button>
                    </Stack>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteApplication(application.id)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Delete Application
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
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
              mx: "auto",
            }}
          >
            <AssignmentIcon sx={{ fontSize: 64, color: "#94a3b8", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#475569" }}>
              No Applications Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You haven't submitted any job applications yet.
            </Typography>
          </Paper>
        )}

        {/* Job Details Section */}
        {jobInfo.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}>
              Job Details
            </Typography>
            {jobInfo.map((job, i) => (
              <Card
                key={i}
                elevation={0}
                sx={{ border: "1px solid #e2e8f0", borderRadius: 3, mb: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
                    {job.title}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1" color="text.primary">
                      <strong>Description:</strong> {job.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      <strong>Requirements:</strong> {job.requirements}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      <strong>Location:</strong> {job.location}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Applicant Details Section */}
        {applicantInfo.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}>
              Applicant Details
            </Typography>
            {applicantInfo.map((applicant, i) => (
              <Card
                key={i}
                elevation={0}
                sx={{ border: "1px solid #e2e8f0", borderRadius: 3 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
                    {applicant.fullName}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Phone:</strong> {applicant.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Location:</strong> {applicant.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Education:</strong> {applicant.education}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Experience:</strong> {applicant.experience}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Skills:</strong> {applicant.skills}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.primary">
                        <strong>Resume:</strong> {applicant.resumePath}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);

}

export default ApplicantApplication;