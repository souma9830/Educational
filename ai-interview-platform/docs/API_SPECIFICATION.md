# Interview Intelligence Platform - API Specification

### 3. Code Execution Output Stream Sandbox
- **POST** `/api/interview/coding/eval`
- **Request Body**: `{ "role": "Fullstack Engineer", "code": "console.log(42)", "language": "javascript" }`
- **Response**: `{ "status": "success", "data": { "overallScore": 95, "compilerOutput": "42\n", "compilerError": null, "testCases": [...] } }` 

## Base URL
`/api`

---

## Authentication Endpoints (`/api/auth`)

### `POST /api/auth/signup`
Creates a new candidate or interviewer user account.

#### Request Body
```json
{
  "email": "candidate@example.com",
  "password": "SecurePassword123!",
  "fullName": "Jane Doe"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "664e4ea4a93a40498eb79e2a",
      "email": "candidate@example.com"
    }
  }
}
```

---

## Interview Endpoints (`/api/interview`)

### `POST /api/interview/start`
Initializes a new mock technical interview session based on candidate uploaded resume and target job role.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Body
```json
{
  "role": "Frontend Engineer",
  "experience": "Mid-level (2-5 yrs)",
  "difficulty": "Medium",
  "resumeSkills": ["React", "JavaScript", "TypeScript"]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "interviewId": "session_9921a",
    "questions": [
      {
        "id": "q1",
        "category": "JavaScript/DOM",
        "text": "Explain Event Delegation and event propagation phases in the DOM."
      }
    ]
  }
}
```

---

## Resume Parsing Endpoints (`/api/resume`)

### `POST /api/resume/upload`
Uploads and extracts skills, education, and technical work experience from candidate resume PDF/Doc files.
