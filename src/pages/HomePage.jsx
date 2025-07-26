
import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Work,
  Business,
  Speed,
  TrendingUp,
  People,
  CheckCircle,
  StarBorder,
} from "@mui/icons-material";

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Enhanced Navbar - Full Width */}
      <AppBar 
        position="static" 
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)",
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.3)",
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
          <Toolbar sx={{ py: 1, minHeight: { xs: 64, md: 72 } }}>
            <Typography 
              variant="h4" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: "bold",
                background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2rem" }
              }}
            >
              JobPortal
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                size="large"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                size="large"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                variant="outlined"
                size="large"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "1rem",
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: "white",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Full Viewport Height */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #2196f3 35%, #42a5f5 70%, #64b5f6 100%)",
          color: "white",
          textAlign: "center",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            animation: "float 6s ease-in-out infinite",
          },
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
          <Typography 
            variant="h1" 
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" },
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              mb: 4,
              lineHeight: 1.1,
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontSize: { xs: "1.3rem", md: "2rem" },
              opacity: 0.95,
              mb: 6,
              maxWidth: "900px",
              mx: "auto",
              fontWeight: 300,
              lineHeight: 1.4,
            }}
          >
            A powerful platform connecting talented applicants with innovative companies worldwide.
          </Typography>
          
          {/* Stats Chips */}
          <Box sx={{ 
            display: "flex", 
            gap: 3, 
            justifyContent: "center", 
            mb: 8, 
            flexWrap: "wrap",
            px: 2 
          }}>
            <Chip 
              icon={<People sx={{ fontSize: 24 }} />} 
              label="10,000+ Active Users" 
              sx={{ 
                background: "rgba(255,255,255,0.25)", 
                color: "white",
                backdropFilter: "blur(15px)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                py: 3,
                px: 2,
                height: "auto",
                "& .MuiChip-label": {
                  fontWeight: 600,
                },
                "&:hover": {
                  background: "rgba(255,255,255,0.35)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease"
              }} 
            />
            <Chip 
              icon={<Work sx={{ fontSize: 24 }} />} 
              label="5,000+ Job Listings" 
              sx={{ 
                background: "rgba(255,255,255,0.25)", 
                color: "white",
                backdropFilter: "blur(15px)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                py: 3,
                px: 2,
                height: "auto",
                "& .MuiChip-label": {
                  fontWeight: 600,
                },
                "&:hover": {
                  background: "rgba(255,255,255,0.35)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease"
              }} 
            />
            <Chip 
              icon={<TrendingUp sx={{ fontSize: 24 }} />} 
              label="95% Success Rate" 
              sx={{ 
                background: "rgba(255,255,255,0.25)", 
                color: "white",
                backdropFilter: "blur(15px)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                py: 3,
                px: 2,
                height: "auto",
                "& .MuiChip-label": {
                  fontWeight: 600,
                },
                "&:hover": {
                  background: "rgba(255,255,255,0.35)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease"
              }} 
            />
          </Box>

          {/* CTA Buttons */}
          <Box mt={6} sx={{ 
            display: "flex", 
            gap: 4, 
            justifyContent: "center", 
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            px: 2
          }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register"
              sx={{
                px: 6,
                py: 2.5,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                fontWeight: "bold",
                borderRadius: 4,
                minWidth: { xs: "280px", sm: "auto" },
                background: "linear-gradient(45deg, #ff6b35 30%, #f7931e 90%)",
                boxShadow: "0 12px 40px rgba(255, 107, 53, 0.4)",
                "&:hover": {
                  background: "linear-gradient(45deg, #e55a2b 30%, #d67d1a 90%)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 50px rgba(255, 107, 53, 0.5)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/joblist"
              sx={{
                px: 6,
                py: 2.5,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                fontWeight: "bold",
                borderRadius: 4,
                minWidth: { xs: "280px", sm: "auto" },
                borderWidth: 3,
                borderColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(15px)",
                background: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.2)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Browse Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Enhanced Features Section - Full Width */}
      <Box sx={{ 
        py: { xs: 10, md: 16 }, 
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center"
      }}>
        <Container maxWidth="xl">
          <Box textAlign="center" mb={10}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Why Choose Us?
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ 
                maxWidth: "800px", 
                mx: "auto",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                lineHeight: 1.6,
              }}
            >
              Discover the features that make our platform the preferred choice for job seekers and employers worldwide
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: "100%",
                  background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
                  border: "2px solid",
                  borderColor: "primary.light",
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 25px 50px rgba(25, 118, 210, 0.25)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 5, textAlign: "center", height: "100%" }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 4,
                      background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                      boxShadow: "0 8px 32px rgba(25, 118, 210, 0.3)",
                    }}
                  >
                    <Work sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                      fontWeight: "bold", 
                      color: "primary.main", 
                      mb: 3,
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    For Applicants
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7, 
                      mb: 4,
                      fontSize: { xs: "1rem", md: "1.2rem" }
                    }}
                  >
                    Easily apply for jobs, upload your resume, and track application status with our intuitive dashboard.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Easy Applications" 
                      sx={{ 
                        background: "rgba(25, 118, 210, 0.1)",
                        color: "primary.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Resume Builder" 
                      sx={{ 
                        background: "rgba(25, 118, 210, 0.1)",
                        color: "primary.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Status Tracking" 
                      sx={{ 
                        background: "rgba(25, 118, 210, 0.1)",
                        color: "primary.main",
                        fontWeight: 600,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: "100%",
                  background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)",
                  border: "2px solid",
                  borderColor: "secondary.light",
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 25px 50px rgba(156, 39, 176, 0.25)",
                    borderColor: "secondary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 5, textAlign: "center", height: "100%" }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 4,
                      background: "linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                    }}
                  >
                    <Business sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                      fontWeight: "bold", 
                      color: "secondary.main", 
                      mb: 3,
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    For Companies
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7, 
                      mb: 4,
                      fontSize: { xs: "1rem", md: "1.2rem" }
                    }}
                  >
                    Post jobs, manage applications, and hire qualified candidates through our comprehensive hiring tools.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyCenter: "center" }}>
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Job Posting" 
                      sx={{ 
                        background: "rgba(156, 39, 176, 0.1)",
                        color: "secondary.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Candidate Management" 
                      sx={{ 
                        background: "rgba(156, 39, 176, 0.1)",
                        color: "secondary.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Analytics" 
                      sx={{ 
                        background: "rgba(156, 39, 176, 0.1)",
                        color: "secondary.main",
                        fontWeight: 600,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                elevation={0}
                sx={{ 
                  height: "100%",
                  background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 50%, #a5d6a7 100%)",
                  border: "2px solid",
                  borderColor: "success.light",
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 25px 50px rgba(76, 175, 80, 0.25)",
                    borderColor: "success.main",
                  },
                }}
              >
                <CardContent sx={{ p: 5, textAlign: "center", height: "100%" }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 4,
                      background: "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
                      boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
                    }}
                  >
                    <Speed sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                      fontWeight: "bold", 
                      color: "success.main", 
                      mb: 3,
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    Easy to Use
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7, 
                      mb: 4,
                      fontSize: { xs: "1rem", md: "1.2rem" }
                    }}
                  >
                    Fast, responsive design built with modern web technologies for the best user experience.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Modern Design" 
                      sx={{ 
                        background: "rgba(76, 175, 80, 0.1)",
                        color: "success.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Mobile Friendly" 
                      sx={{ 
                        background: "rgba(76, 175, 80, 0.1)",
                        color: "success.main",
                        fontWeight: 600,
                      }} 
                    />
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Fast Performance" 
                      sx={{ 
                        background: "rgba(76, 175, 80, 0.1)",
                        color: "success.main",
                        fontWeight: 600,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Footer - Full Width */}
      <Box 
        sx={{
          background: "linear-gradient(135deg, #263238 0%, #37474f 50%, #455a64 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: "bold", 
              mb: 3,
              background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            JobPortal
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              fontSize: "1.2rem",
              mb: 2,
            }}
          >
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.7,
              fontSize: "1rem"
            }}
          >
            Connecting talent with opportunity worldwide
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;


