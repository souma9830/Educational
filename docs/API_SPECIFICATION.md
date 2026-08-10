# API Specification & Routing Architecture

## Overview
Interview Intelligence provides RESTful API endpoints for authentication, resume parsing, interview generation, live proctoring telemetry, code execution sandbox, reporting, and platform diagnostics.

---

## 1. System Health & Diagnostics API

### `GET /api/health`
Returns high-level application health status, database connection metrics, and process uptime.
* **Headers**: `Accept: application/json`
* **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": "142.50s",
    "database": {
      "connected": true,
      "type": "mongodb",
      "pingLatencyMs": 12
    },
    "timestamp": "2026-08-09T21:30:00.000Z"
  },
  "message": "Service diagnostics updated"
}
```

### `GET /api/health/diagnostics`
Returns real-time server telemetry including CPU counts, memory heap statistics, system free memory, and DB connection state.
* **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "diagnostics": {
      "status": "healthy",
      "database": { "state": "connected", "host": "127.0.0.1", "name": "camsense" },
      "system": {
        "uptimeSeconds": 142,
        "memoryRssMb": 115,
        "heapUsedMb": 65,
        "heapTotalMb": 90,
        "cpuCount": 8,
        "nodeVersion": "v24.12.0"
      }
    }
  }
}
```

---

## 2. Authentication API

### `POST /api/auth/verify-otp`
Verifies single-use OTP passcode sent during authentication recovery or login.
* **Headers**: `Content-Type: application/json`
* **Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
* **Rate Limits**: 3 requests per 15 minutes window (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`).

---

## 3. Proctoring & Telemetry API

### `POST /api/proctor/log`
Logs candidate violation telemetry during live interview assessments (tab switches, webcam loss, stream tampering).
* **Body**:
```json
{
  "interviewId": "int_9921",
  "violationType": "tab_switch",
  "severity": "medium",
  "details": "User navigated away from active tab"
}
```
