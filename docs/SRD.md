# System Requirement Document (SRD)

# Mini Recruitment Dashboard

---

# System Architecture

Client

* Next.js 15
* TypeScript
* Tailwind CSS
* Shadcn UI
* TanStack Query

Server

* Next.js Route Handler API

Database

* PostgreSQL

ORM

* Prisma ORM

Authentication

* JWT

---

# Database Design

## Entity Relationship

User
│
├── Job
│
└── Candidate
│
└── Application
│
└── Job

---

# Prisma Schema Design

## User

Represents recruiter account.

Fields:

* id
* name
* email
* password
* createdAt
* updatedAt

---

## Job

Represents job vacancy.

Fields:

* id
* title
* department
* location
* description
* status
* createdBy
* createdAt
* updatedAt

Status Enum:

* OPEN
* CLOSED

---

## Candidate

Represents candidate profile.

Fields:

* id
* fullName
* email
* phone
* createdAt
* updatedAt

---

## Application

Represents candidate application.

Fields:

* id
* candidateId
* jobId
* stage
* appliedAt
* updatedAt

Stage Enum:

* APPLIED
* INTERVIEW
* HIRED

---

# Prisma Schema

```prisma
enum JobStatus {
  OPEN
  CLOSED
}

enum ApplicationStage {
  APPLIED
  INTERVIEW
  HIRED
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String

  jobs      Job[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Job {
  id          String    @id @default(cuid())
  title       String
  department  String
  location    String
  description String
  status      JobStatus @default(OPEN)

  createdById String
  createdBy   User @relation(fields: [createdById], references: [id])

  applications Application[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Candidate {
  id          String @id @default(cuid())
  fullName    String
  email       String @unique
  phone       String

  applications Application[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Application {
  id          String @id @default(cuid())

  candidateId String
  candidate   Candidate @relation(fields: [candidateId], references: [id])

  jobId       String
  job         Job @relation(fields: [jobId], references: [id])

  stage       ApplicationStage @default(APPLIED)

  appliedAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

# API Specification

## Authentication

POST /api/auth/login

Request:

```json
{
  "email": "admin@recruit.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

---

# Dashboard

GET /api/dashboard/stats

Response:

```json
{
  "totalJobs": 10,
  "totalCandidates": 25,
  "totalApplications": 30,
  "applied": 15,
  "interview": 10,
  "hired": 5
}
```

---

# Jobs

GET /api/jobs

GET /api/jobs/:id

POST /api/jobs

PATCH /api/jobs/:id

DELETE /api/jobs/:id

---

# Candidates

GET /api/candidates

GET /api/candidates/:id

POST /api/candidates

PATCH /api/candidates/:id

DELETE /api/candidates/:id

---

# Applications

GET /api/applications

POST /api/applications

PATCH /api/applications/:id/stage

DELETE /api/applications/:id

---

# Seeder Requirements

Create:

1 User

```txt
Email:
admin@recruit.com

Password:
password123
```

3 Jobs

* Frontend Developer
* Backend Developer
* UI/UX Designer

10 Candidates

Generate realistic dummy candidates.

15 Applications

Distribution:

* Applied: 7
* Interview: 5
* Hired: 3

---

# UI Design System

Style:

* Modern SaaS Dashboard
* Minimal
* Clean
* Professional

Color Palette:

Primary:
#2563EB

Background:
#F8FAFC

Card:
#FFFFFF

Border:
#E2E8F0

Text:
#0F172A

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

Radius:

12px

Spacing:

8px Grid System

Typography:

Font:
Inter

Responsive Breakpoints:

Mobile:
< 768px

Tablet:
768px - 1024px

Desktop:

> 1024px

```
```
