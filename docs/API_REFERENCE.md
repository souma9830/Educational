# API Reference Architecture Specification

## Overview
This document outlines the core REST API contract endpoints for the Interview Intelligence platform.

## Endpoints

### Authentication
- `POST /api/auth/register` - Create candidate user account.
- `POST /api/auth/login` - Authenticate candidate user and return JWT bearer token.

### Candidate Proctoring
- `POST /api/proctoring/log` - Record proctoring violation event (tab switch, window exit).
- `GET /api/proctoring/session/:sessionId` - Retrieve all violation logs for a session.
- `GET /api/proctoring/summary/:sessionId` - Retrieve summary metrics of violations.

### Question Bank & Templates
- `GET /api/interview/questions/banks` - Fetch custom question template presets.
- `POST /api/interview/questions/banks` - Create recruiter question bank.

### Analytics & Export
- `POST /api/analytics/export` - Export candidate report metrics to JSON or CSV.
