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
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
  Build as BuildIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

function AppliedApplicant() {
  const [info, setInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const token = localStorage.getItem("token");
  const [companyId, setCompanyId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLoggedInUser = async () => {
    try {
      const res = await axios.get(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/user/getUserInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanyId(res.data.id);
    } catch (error) {
      console.error("Error fetching user info", error);
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
      console.error("Error fetching applicant info", error);
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
      console.error("Error fetching job info", error);
    }
  };

  const updateStatus = async (id, applicantId, newStatus) => {
    try {
      await axios.put(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/application/updatestatus/${id}`,
        { status: newStatus },
        {
          params: { applicantId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Status Updated");
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
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
      alert("Application Deleted successfully");
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const fetchApplications = () => {
    axios
      .get(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/application/appliedjob",
        {
          params: { page, size },
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setInfo(res.data.content))
      .catch((err) => console.error("Error fetching applications:", err));
  };

  useEffect(() => {
    handleLoggedInUser();
    fetchApplications();
  }, [page, size]);

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED": return "success";
      case "ACCEPTED": return "primary";
      case "REJECTED": return "error";
      default: return "warning";
    }
  };

  const navItems = [
    { text: "Home", path: "/cdashboard", icon: <HomeIcon /> },
    { text: "Settings", path: "/csetting", icon: <SettingsIcon /> },
    { text: "Applied Jobs", path: "/appliedJob", icon: <AssignmentIcon />, active: true },
    { text: "Logout", action: () => {
      localStorage.removeItem("token");
      navigate("/login");
    }, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>Job Portal - Applications</Typography>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}><PersonIcon /></Avatar>
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 2, bgcolor: "rgba(255,255,255,0.2)" }}>
            <BusinessIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>JobPortal</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Application Manager</Typography>
        </Box>
        <List sx={{ px: 2, py: 2 }}>
          {navItems.map(({ text, path, action, icon, active }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={path ? Link : "div"}
                to={path}
                onClick={action}
                sx={{
                  borderRadius: 2, mb: 1, color: "white",
                  background: active ? "rgba(255,255,255,0.2)" : "transparent",
                  "&:hover": { background: "rgba(255,255,255,0.1)" },
                }}
              >
                <Box sx={{ mr: 2, minWidth: 24 }}>{icon}</Box>
                <ListItemText primary={text} sx={{ "& .MuiListItemText-primary": { fontWeight: active ? "bold" : "normal" } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Paper elevation={8} sx={{ p: 3, mb: 3, borderRadius: 3, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2c3e50", textAlign: "center" }}>
              Applied Applicants ({info.length})
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            {/* Applications List */}
            <Grid item xs={12} lg={6}>
              <Card elevation={12} sx={{ borderRadius: 3, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(15px)", height: "calc(100vh - 240px)", overflow: "auto" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2c3e50", display: "flex", alignItems: "center", gap: 1 }}>
                    <AssignmentIcon />Applications
                  </Typography>
                  {info.length > 0 ? (
                    info.map((item) => (
                      <Paper key={item.id} elevation={3} sx={{ mb: 2, p: 3, borderRadius: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-2px)", boxShadow: 6 } }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                              Applicant #{item.applicantId}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">Job Post #{item.jobPostId}</Typography>
                          </Box>
                          <Chip label={item.status} color={getStatusColor(item.status)} size="small" sx={{ fontWeight: "bold" }} />
                        </Stack>
                        <Typography variant="body2" sx={{ mb: 2, color: "#7f8c8d" }}>
                          Applied: {new Date(item.appliedAt).toLocaleString()}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                          <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => getApplicantById(item.applicantId)} sx={{ borderRadius: 2 }}>
                            View Applicant
                          </Button>
                          <Button variant="outlined" size="small" startIcon={<WorkIcon />} onClick={() => getJobById(item.jobPostId)} sx={{ borderRadius: 2 }}>
                            View Job
                          </Button>
                          <Button variant="contained" color="success" size="small" onClick={() => updateStatus(item.id, item.applicantId, "APPROVED")} sx={{ borderRadius: 2 }}>
                            Approve
                          </Button>
                          <Button variant="contained" color="primary" size="small" onClick={() => updateStatus(item.id, item.applicantId, "ACCEPTED")} sx={{ borderRadius: 2 }}>
                            Accept
                          </Button>
                          <Button variant="contained" color="error" size="small" onClick={() => updateStatus(item.id, item.applicantId, "REJECTED")} sx={{ borderRadius: 2 }}>
                            Reject
                          </Button>
                          <IconButton color="error" size="small" onClick={() => deleteApplication(item.id)} sx={{ background: "rgba(255,0,0,0.1)" }}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </Paper>
                    ))
                  ) : (
                    <Paper elevation={2} sx={{ p: 4, textAlign: "center", borderRadius: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
                      <AssignmentIcon sx={{ fontSize: 60, color: "#667eea", mb: 2 }} />
                      <Typography variant="h6">No applications found</Typography>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Details Panel */}
            <Grid item xs={12} lg={6}>
              <Stack spacing={3}>
                {/* Job Details */}
                <Card elevation={12} sx={{ borderRadius: 3, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(15px)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#2c3e50", display: "flex", alignItems: "center", gap: 1 }}>
                      <WorkIcon />Job Details
                    </Typography>
                    {jobInfo.length > 0 ? (
                      jobInfo.map((job) => (
                        <Paper key={job.id} elevation={2} sx={{ p: 3, borderRadius: 2, background: "linear-gradient(135deg, #667eea15, #764ba215)" }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}>{job.title}</Typography>
                          <Typography sx={{ mb: 1 }}><strong>Description:</strong> {job.description}</Typography>
                          <Typography sx={{ mb: 1 }}><strong>Requirements:</strong> {job.requirements}</Typography>
                          <Typography><LocationOnIcon sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }} /><strong>Location:</strong> {job.location}</Typography>
                        </Paper>
                      ))
                    ) : (
                      <Typography color="textSecondary" sx={{ textAlign: "center", py: 3 }}>Select a job to view details</Typography>
                    )}
                  </CardContent>
                </Card>

                {/* Applicant Details */}
                <Card elevation={12} sx={{ borderRadius: 3, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(15px)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#2c3e50", display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon />Applicant Details
                    </Typography>
                    {applicantInfo.length > 0 ? (
                      applicantInfo.map((app) => (
                        <Paper key={app.id} elevation={2} sx={{ p: 3, borderRadius: 2, background: "linear-gradient(135deg, #764ba215, #667eea15)" }}>
                          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                            <Avatar sx={{ mr: 2, bgcolor: "#667eea" }}><PersonIcon /></Avatar>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>{app.fullName}</Typography>
                          </Stack>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <PhoneIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Phone:</strong> {app.phone}
                              </Typography>
                              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <LocationOnIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Location:</strong> {app.location}
                              </Typography>
                              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <SchoolIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Education:</strong> {app.education}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <BuildIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Experience:</strong> {app.experience}
                              </Typography>
                              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <BuildIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Skills:</strong> {app.skills}
                              </Typography>
                              <Typography sx={{ display: "flex", alignItems: "center" }}>
                                <DescriptionIcon sx={{ fontSize: 16, mr: 1 }} /><strong>Resume:</strong> {app.resumePath}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))
                    ) : (
                      <Typography color="textSecondary" sx={{ textAlign: "center", py: 3 }}>Select an applicant to view details</Typography>
                    )}
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default AppliedApplicant;