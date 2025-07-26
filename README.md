DevOps Job Portal System

A full-stack Job Portal system built with React (frontend) and Spring Boot (backend), fully integrated with CI/CD pipelines using GitHub Actions, deployed on Render (backend) and Vercel (frontend).



Features

- User Registration with OTP Verification
- JWT Authentication & Role-Based Access (Applicant, Company, Admin)
- CI/CD Auto-deployment using GitHub Actions
- Backend: Spring Boot + PostgreSQL (Render.com), (https://spring-boot-jobportal-system-devops-2.onrender.com)
- Frontend: React.js (Vercel) (https://jobportal-frontend-intergration-wit.vercel.app)
- Docker-ready (optional)


Tech Stack

- Frontend: React.js, Axios, React Router
- Backend: Spring Boot, Spring Security, PostgreSQL
- CI/CD: GitHub Actions
- Hosting: Render (backend), Vercel (frontend)


CI/CD Pipeline

- Every push to `main` triggers deployment:
  - Builds & tests Spring Boot backend
  - Sends deploy hook to Render for backend redeploy
  - Vercel automatically redeploys frontend


