import React, { useEffect, useState } from "react";
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
  TextField,
  Button,
  Divider,
  Container,
  Paper,
  Avatar,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Chip,
  Stack,
  InputAdornment,
  Fade,
  alpha,
} from "@mui/material";
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  ExitToApp as LogoutIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as EducationIcon,
  Work as ExperienceIcon,
  Build as SkillsIcon,
  Description as ResumeIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

function ApplicantSetting() {
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [resumePath, setResumePath] = useState("");
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
      setUserId(res.data.id);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUserAndApplicant = async () => {
      try {
        const res = await axios.get(
          "https://spring-boot-jobportal-system-devops-2.onrender.com/api/user/getUserInfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const id = res.data.id;
        setUserId(id);

        const applicantRes = await axios.get(
          `https://spring-boot-jobportal-system-devops-2.onrender.com/api/applicant/getapplicantbyid/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = applicantRes.data;
        setFullName(data.fullName || "");
        setPhone(data.phone || "");
        setLocation(data.location || "");
        setEducation(data.education || "");
        setExperience(data.experience || "");
        setSkills(data.skills || "");
        setResumePath(data.resumePath || "");
      } catch (err) {
        console.error("Failed to fetch user/applicant:", err);
      }
    };

    fetchUserAndApplicant();
  }, [token]);

  const handleApplicantUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `https://spring-boot-jobportal-system-devops-2.onrender.com/api/applicant/update/${userId}`,
        {
          fullName,
          phone,
          location,
          education,
          experience,
          skills,
          resumePath,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Applicant profile updated successfully");
    } catch (error) {
      console.error("Error updating applicant:", error);
      alert("Failed to update applicant profile");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { 
      text: "Home", 
      path: "/adashboard",
      icon: <HomeIcon />,
      color: "#6366f1"
    },
    { 
      text: "My Applications", 
      path: "/viewapplication",
      icon: <AssignmentIcon />,
      color: "#10b981"
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

  const formFields = [
    { 
      name: 'fullName', 
      label: 'Full Name', 
      value: fullName, 
      setter: setFullName, 
      icon: <PersonIcon />,
      multiline: false 
    },
    { 
      name: 'phone', 
      label: 'Phone Number', 
      value: phone, 
      setter: setPhone, 
      icon: <PhoneIcon />,
      multiline: false 
    },
    { 
      name: 'location', 
      label: 'Location', 
      value: location, 
      setter: setLocation, 
      icon: <LocationIcon />,
      multiline: false 
    },
    { 
      name: 'education', 
      label: 'Education', 
      value: education, 
      setter: setEducation, 
      icon: <EducationIcon />,
      multiline: true 
    },
    { 
      name: 'experience', 
      label: 'Experience', 
      value: experience, 
      setter: setExperience, 
      icon: <ExperienceIcon />,
      multiline: true 
    },
    { 
      name: 'skills', 
      label: 'Skills', 
      value: skills, 
      setter: setSkills, 
      icon: <SkillsIcon />,
      multiline: true 
    },
    { 
      name: 'resumePath', 
      label: 'Resume Path', 
      value: resumePath, 
      setter: setResumePath, 
      icon: <ResumeIcon />,
      multiline: false 
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
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
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: alpha("#ffffff", 0.2),
              mx: "auto",
              mb: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Applicant Panel
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Profile Settings
          </Typography>
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
                  <Box sx={{ mr: 2, color: color }}>{icon}</Box>
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
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
                  <Box sx={{ mr: 2, color: color }}>{icon}</Box>
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
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
        }}
      >
        {/* Header */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            bgcolor: "white", 
            borderBottom: "1px solid #e2e8f0",
            color: "#1e293b"
          }}
        >
          <Toolbar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
              Update Applicant Profile
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip 
              label="Profile Settings"
              sx={{ 
                bgcolor: "#dbeafe", 
                color: "#1e40af",
                fontWeight: 600
              }} 
            />
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
          <Fade in={true} timeout={600}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 4,
                overflow: "hidden",
                background: "white",
              }}
            >
              {/* Profile Header */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  p: 4,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: alpha("#ffffff", 0.2),
                    mx: "auto",
                    mb: 2,
                    backdropFilter: "blur(10px)",
                    border: "3px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {fullName || "Your Profile"}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Keep your profile updated to attract better opportunities
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Box
                  component="form"
                  onSubmit={handleApplicantUpdate}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={3}>
                    {formFields.map((field, index) => (
                      <Grid item xs={12} md={field.multiline ? 12 : 6} key={field.name}>
                        <Fade in={true} timeout={300 + index * 100}>
                          <TextField
                            fullWidth
                            label={field.label}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            required
                            multiline={field.multiline}
                            rows={field.multiline ? 3 : 1}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Box sx={{ color: "#667eea" }}>
                                    {field.icon}
                                  </Box>
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
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#667eea",
                              },
                            }}
                          />
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      disabled={loading}
                      startIcon={<SaveIcon />}
                      sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        minWidth: 200,
                        "&:hover": {
                          background: "linear-gradient(135deg, #5a67d8 0%, #6b5b95 100%)",
                          transform: "translateY(-2px)",
                        },
                        "&:disabled": {
                          background: "#94a3b8",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>

          {/* Quick Tips Card */}
          <Fade in={true} timeout={800}>
            <Card
              elevation={0}
              sx={{
                mt: 3,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
                  💡 Profile Tips
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    • Use a professional phone number and email address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Highlight your key skills and relevant experience
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Keep your education information up to date
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Ensure your resume path is accessible and current
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}

export default ApplicantSetting;