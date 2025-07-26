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
  Paper,
  Container,
  Grid,
  Divider,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import {
  Person,
  Phone,
  LocationOn,
  School,
  Work,
  Build,
  Description,
} from "@mui/icons-material";

function CreateApplicantInfo() {
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
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

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

  const handleApplicant = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (
      !fullName ||
      !phone ||
      !location ||
      !education ||
      !experience ||
      !skills ||
      !resumePath
    ) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://spring-boot-jobportal-system-devops-2.onrender.com/api/applicant/create",
        {
          userId,
          fullName,
          phone,
          location,
          education,
          experience,
          skills,
          resumePath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Applicant profile created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to create applicant profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={12}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              Create Your Profile
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Build your professional applicant information
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {errorMsg && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
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
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                {successMsg}
              </Alert>
            )}

            <form onSubmit={handleApplicant} noValidate>
              <Grid container spacing={3}>
                {/* Personal Information Section */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2196F3",
                      fontWeight: "bold",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Person sx={{ mr: 1 }} />
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    fullWidth
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Professional Information Section */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2196F3",
                      fontWeight: "bold",
                      mb: 2,
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Work sx={{ mr: 1 }} />
                    Professional Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Education"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", pt: 2 }}>
                          <School color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Experience"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", pt: 2 }}>
                          <Work color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Skills"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", pt: 2 }}>
                          <Build color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Resume Path"
                    fullWidth
                    required
                    value={resumePath}
                    onChange={(e) => setResumePath(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#2196F3",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 4,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      borderRadius: 3,
                      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                        boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: "rgba(0, 0, 0, 0.12)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Create Profile"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateApplicantInfo;