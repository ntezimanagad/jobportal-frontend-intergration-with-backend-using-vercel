import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Paper,
  Card,
  CardContent,
  Container,
  Chip,
  Grid,
  Fade,
  Zoom,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const DRAWER_WIDTH = 280;

function CompanyDashboard() {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const token = localStorage.getItem("token");

  const [companyId, setCompanyId] = useState("");
  const [id, setJobPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirement] = useState("");
  const [location, setLocation] = useState("");
  const [isApproved] = useState("PENDING");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchCompanyId = async () => {
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
      setErrorMsg(
        error.response?.data?.message || "Failed to fetch user information."
      );
    }
  };

  const fetchJobPosts = async () => {
    try {
      const res = await axios.get(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/company_post",
        {
          params: { page, size },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInfo(res.data.content || []);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Error fetching company posts."
      );
    }
  };

  useEffect(() => {
    fetchCompanyId();
  }, []);

  useEffect(() => {
    if (companyId) fetchJobPosts();
  }, [companyId, page, size]);

  const resetForm = () => {
    setId("");
    setTitle("");
    setDescription("");
    setRequirement("");
    setLocation("");
  };

  const handleJobPostDelete = async (jobId) => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      await axios.delete(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/delete/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Job deleted successfully.");
      fetchJobPosts();
      // Clear form if deleting the currently edited job
      if (jobId === id) resetForm();
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to delete job post."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJobPostCreateOrUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title || !description || !requirements || !location) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        // Update existing
        await axios.put(
          `https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/update/${id}`,
          {
            companyId,
            title,
            description,
            requirements,
            location,
            isApproved,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMsg("Job updated successfully.");
      } else {
        // Create new
        await axios.post(
          "https://spring-boot-jobportal-system-devops-2.onrender.com/api/jobpost/create",
          {
            companyId,
            title,
            description,
            requirements,
            location,
            isApproved,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMsg("Job created successfully.");
      }
      resetForm();
      fetchJobPosts();
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to create/update job post."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "warning";
    }
  };

  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardIcon />, active: true },
    { text: "Company Profile", icon: <BusinessIcon />, link: "/csetting" },
    { text: "Applied Jobs", icon: <AssignmentIcon />, link: "/appliedJob" },
    { text: "Settings", icon: <SettingsIcon />, link: "/csetting" },
    { text: "Notifications", icon: <NotificationsIcon /> },
    { text: "Profile", icon: <PersonIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            edge="start"
            sx={{ mr: 2 }}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Company Portal
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 40,
              height: 40,
            }}
          >
            <PersonIcon />
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
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
            Company Dashboard
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Manage your job posts
          </Typography>
        </Box>

        <List sx={{ px: 2, py: 2 }}>
          {sidebarItems.map((item, index) => (
            <ListItemButton
              key={item.text}
              component={item.link ? Link : "div"}
              to={item.link}
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
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: item.active ? "bold" : "normal",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
          <ListItemButton
            sx={{
              borderRadius: 2,
              color: "white",
              "&:hover": {
                background: "rgba(255,0,0,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          transition: "margin 0.3s ease",
          marginLeft: sidebarOpen ? 0 : `-${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
          <Fade in timeout={800}>
            <Box>
              {/* Welcome Header */}
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
                  Job Management Dashboard
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "#7f8c8d",
                    mb: 3,
                  }}
                >
                  Create, edit, and manage your company's job postings
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    component={Link}
                    to="/csetting"
                    variant="contained"
                    startIcon={<SettingsIcon />}
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
                    Go to Setting
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

              <Grid container spacing={4}>
                {/* Form Section */}
                <Grid item xs={12} xl={5}>
                  <Zoom in timeout={1000}>
                    <Card
                      elevation={12}
                      sx={{
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        height: "fit-content",
                        position: "sticky",
                        top: 20,
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            mb: 3,
                            fontWeight: "bold",
                            color: "#2c3e50",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {id ? <UpdateIcon /> : <AddIcon />}
                          {id ? "Update Job Post" : "Create Job Post"}
                        </Typography>

                        {errorMsg && (
                          <Alert
                            severity="error"
                            sx={{
                              mb: 2,
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
                              mb: 2,
                              borderRadius: 2,
                              "& .MuiAlert-icon": {
                                fontSize: "1.5rem",
                              },
                            }}
                          >
                            {successMsg}
                          </Alert>
                        )}

                        <form onSubmit={handleJobPostCreateOrUpdate} noValidate>
                          <TextField
                            label="Job Title"
                            fullWidth
                            required
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            InputProps={{
                              startAdornment: <WorkIcon sx={{ mr: 1, color: "#667eea" }} />,
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
                            label="Job Description"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            margin="normal"
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
                            label="Requirements"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            margin="normal"
                            value={requirements}
                            onChange={(e) => setRequirement(e.target.value)}
                            disabled={loading}
                            InputProps={{
                              startAdornment: <ListAltIcon sx={{ mr: 1, color: "#667eea", alignSelf: "flex-start", mt: 1 }} />,
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
                            label="Location"
                            fullWidth
                            required
                            margin="normal"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={loading}
                            InputProps={{
                              startAdornment: <LocationOnIcon sx={{ mr: 1, color: "#667eea" }} />,
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
                            sx={{
                              mt: 3,
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
                            ) : id ? (
                              "Update Job Post"
                            ) : (
                              "Create Job Post"
                            )}
                          </Button>
                        </form>

                        {id && (
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={resetForm}
                            sx={{
                              mt: 2,
                              py: 1.5,
                              borderRadius: 3,
                              borderColor: "#667eea",
                              color: "#667eea",
                              "&:hover": {
                                borderColor: "#764ba2",
                                color: "#764ba2",
                                background: "rgba(102, 126, 234, 0.1)",
                              },
                            }}
                          >
                            Cancel Edit
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>

                {/* Job Posts Section */}
                <Grid item xs={12} xl={7}>
                  <Zoom in timeout={1200}>
                    <Card
                      elevation={12}
                      sx={{
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        height: "calc(100vh - 160px)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ p: 4, pb: 2, flexShrink: 0 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            mb: 2,
                            fontWeight: "bold",
                            color: "#2c3e50",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <WorkIcon />
                          Your Job Posts ({info.length})
                        </Typography>
                      </CardContent>

                      <Box sx={{ flexGrow: 1, overflow: "auto", px: 4, pb: 4 }}>
                        {info.length === 0 ? (
                          <Paper
                            elevation={2}
                            sx={{
                              p: 6,
                              textAlign: "center",
                              borderRadius: 3,
                              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                              height: "200px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <WorkIcon sx={{ fontSize: 80, color: "#667eea", mb: 2 }} />
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                              No job posts found.
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Create your first job post to get started!
                            </Typography>
                          </Paper>
                        ) : (
                          <List sx={{ p: 0 }}>
                            {info.map((job, index) => (
                              <React.Fragment key={job.id}>
                                <Fade in timeout={300 * (index + 1)}>
                                  <Paper
                                    elevation={id === job.id ? 8 : 3}
                                    sx={{
                                      mb: 3,
                                      borderRadius: 3,
                                      overflow: "hidden",
                                      background: id === job.id 
                                        ? "linear-gradient(135deg, #667eea15, #764ba215)"
                                        : "white",
                                      border: id === job.id ? "2px solid #667eea" : "1px solid #e0e0e0",
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                      },
                                    }}
                                  >
                                    <ListItem
                                      sx={{ p: 3 }}
                                      secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                          <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => {
                                              setJobPost(job.id);
                                              setTitle(job.title);
                                              setDescription(job.description);
                                              setRequirement(job.requirements);
                                              setLocation(job.location);
                                            }}
                                            disabled={loading}
                                            sx={{
                                              background: "linear-gradient(45deg, #667eea, #764ba2)",
                                              color: "white",
                                              width: 45,
                                              height: 45,
                                              "&:hover": {
                                                background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                                                transform: "scale(1.1)",
                                              },
                                              transition: "all 0.3s ease",
                                            }}
                                          >
                                            <EditIcon />
                                          </IconButton>

                                          <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleJobPostDelete(job.id)}
                                            disabled={loading}
                                            sx={{
                                              background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
                                              color: "white",
                                              width: 45,
                                              height: 45,
                                              "&:hover": {
                                                background: "linear-gradient(45deg, #ff5252, #e53935)",
                                                transform: "scale(1.1)",
                                              },
                                              transition: "all 0.3s ease",
                                            }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </Stack>
                                      }
                                    >
                                      <ListItemText
                                        primary={
                                          <Typography
                                            variant="h6"
                                            sx={{
                                              fontWeight: "bold",
                                              color: "#2c3e50",
                                              mb: 1,
                                              pr: 12,
                                            }}
                                          >
                                            {job.title}
                                          </Typography>
                                        }
                                        secondary={
                                          <Box>
                                            <Typography
                                              variant="body2"
                                              sx={{ mb: 1, color: "#34495e", pr: 12 }}
                                            >
                                              <strong>Description:</strong> {job.description}
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              sx={{ mb: 1, color: "#34495e", pr: 12 }}
                                            >
                                              <strong>Requirements:</strong> {job.requirements}
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              sx={{ mb: 2, color: "#34495e", pr: 12 }}
                                            >
                                              <strong>Location:</strong> {job.location}
                                            </Typography>
                                            <Chip
                                              label={job.isApproved || "Pending"}
                                              color={getStatusColor(job.isApproved)}
                                              size="small"
                                              sx={{
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                fontSize: "0.75rem",
                                              }}
                                            />
                                          </Box>
                                        }
                                      />
                                    </ListItem>
                                  </Paper>
                                </Fade>
                              </React.Fragment>
                            ))}
                          </List>
                        )}
                      </Box>
                    </Card>
                  </Zoom>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}

export default CompanyDashboard;