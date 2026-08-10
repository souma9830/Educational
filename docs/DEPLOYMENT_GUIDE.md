# Production Deployment Guide

This guide provides step-by-step instructions for deploying the **Interview Intelligence** platform in production using Docker Compose, Render, Vercel, or traditional Node.js host environments.

## 1. Environment Configuration

Copy `.env.example` to `.env` in `ai-interview-platform/` and populate the required variables:

```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/interview_db
GEMINI_API_KEY=your_gemini_api_key_here
```

Validate configuration before deployment:

```bash
npm run validate-env
```

## 2. Docker Compose Deployment

Run the full stack via Docker Compose:

```bash
docker-compose up -d --build
```

Verify service health:

```bash
curl http://localhost:5000/api/health
```

## 3. GitHub Actions Continuous Integration

The repository includes automated CI quality checks configured in `.github/workflows/ci.yml`. On every pull request, the workflow:
- Validates environment configurations.
- Executes the security and unit test suite across Node 18.x and 20.x.
- Runs dependency vulnerability security audits.
