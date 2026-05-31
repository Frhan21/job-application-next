# AGENTS.md

# Mini Recruitment Dashboard

## Project Context

This project is a Mini Recruitment Dashboard built as a fullstack technical test.

The application is an internal dashboard for recruiters to manage job vacancies, candidates, and candidate application pipeline.

The system should stay simple, clean, and focused on the required features.

---

## Main Goals

Build a simple fullstack recruitment dashboard with:

- Dummy login authentication
- Dashboard statistic cards
- Job management
- Candidate management
- Candidate pipeline
- Responsive modern SaaS UI

---

## Tech Stack

Use the following stack:

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma ORM
- PostgreSQL
- JWT Authentication
- TanStack Query
- React Hook Form
- Zod

---

## Core Features

### Authentication

Implement dummy login using seeded user from database.

Default credential:

```txt
email: admin@recruit.com
password: password123
````

Authentication requirements:

* Login page
* JWT token generation
* Protected dashboard routes
* Logout
* Redirect unauthenticated user to login page

---

### Dashboard

Route:

```txt
/dashboard
```

Show statistic cards:

* Total Jobs
* Total Candidates
* Total Applications

Show pipeline summary:

* Applied
* Interview
* Hired

---

### Job Management

Route:

```txt
/dashboard/jobs
```

Features:

* List jobs
* Search jobs by title
* Filter jobs by status
* Add new job
* Edit job
* Delete job

Job status:

* OPEN
* CLOSED

---

### Candidate Management

Route:

```txt
/dashboard/candidates
```

Features:

* List candidates
* Add candidate
* Edit candidate
* Delete candidate
* Show applied job
* Show current pipeline stage

---

### Candidate Pipeline

Route:

```txt
/dashboard/pipeline
```

Pipeline stages:

* APPLIED
* INTERVIEW
* HIRED

Requirements:

* Display candidates grouped by stage
* Allow moving candidate application between stages
* Use simple button action or select dropdown
* Drag and drop is optional, not required

---

## Database Schema

Use Prisma ORM.

Main models:

* User
* Job
* Candidate
* Application

Enums:

* JobStatus
* ApplicationStage

Use the following schema direction:

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

## Seeder Requirements

Create seed data using Prisma seed.

Seed:

* 1 admin user
* 3 jobs
* 10 candidates
* 15 applications

Default admin:

```txt
email: admin@recruit.com
password: password123
```

Jobs:

* Frontend Developer
* Backend Developer
* UI/UX Designer

Applications distribution:

* APPLIED: 7
* INTERVIEW: 5
* HIRED: 3

Password must be hashed before storing in database.

---

## API Routes

Use Next.js Route Handlers.

Required endpoints:

### Auth

```txt
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Dashboard

```txt
GET /api/dashboard/stats
```

### Jobs

```txt
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id
```

### Candidates

```txt
GET    /api/candidates
GET    /api/candidates/:id
POST   /api/candidates
PATCH  /api/candidates/:id
DELETE /api/candidates/:id
```

### Applications

```txt
GET    /api/applications
POST   /api/applications
PATCH  /api/applications/:id/stage
DELETE /api/applications/:id
```

---

## Frontend Pages

Use Next.js App Router.

Required routes:

```txt
/login
/dashboard
/dashboard/jobs
/dashboard/jobs/create
/dashboard/jobs/[id]/edit
/dashboard/candidates
/dashboard/candidates/create
/dashboard/candidates/[id]/edit
/dashboard/pipeline
```

---

## Suggested Folder Structure

```txt
src/
├── app/
│   ├── api/
│   ├── login/
│   ├── dashboard/
│   │   ├── jobs/
│   │   ├── candidates/
│   │   ├── pipeline/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── shared/
│   ├── tables/
│   └── forms/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── jobs/
│   ├── candidates/
│   └── applications/
│
├── hooks/
├── lib/
├── providers/
├── schemas/
├── services/
└── types/
```

---

## UI/UX Direction

Design style:

* Clean
* Simple
* Modern SaaS dashboard
* Professional
* Responsive
* Not too colorful

Color palette:

```txt
Primary: #2563EB
Background: #F8FAFC
Card: #FFFFFF
Border: #E2E8F0
Text Primary: #0F172A
Text Secondary: #64748B
Success: #22C55E
Warning: #F59E0B
Danger: #EF4444
```

Use:

* Sidebar layout
* Topbar
* Stat cards
* Data tables
* Search input
* Select filter
* Status badges
* Form cards
* Confirm delete dialog
* Empty states
* Loading skeletons

---

## UI Rules

* Use Shadcn UI components when possible
* Use Tailwind CSS for layout and styling
* Use responsive design from mobile to desktop
* Sidebar should collapse or become drawer on mobile
* Tables should remain readable on small screens
* Use badges for job status and application stage
* Use consistent spacing, radius, and typography
* Avoid complex animations
* Avoid bright or excessive gradients
* Keep dashboard visually clean

---

## Code Rules

* Use TypeScript strictly
* Avoid `any`
* Use Prisma types where possible
* Use Zod for request and form validation
* Use React Hook Form for forms
* Use TanStack Query for client data fetching
* Use reusable service functions for API calls
* Keep UI components separated from business logic
* Keep components small and focused
* Prefer composition over large configurable components
* Avoid duplicated code
* Handle loading, empty, and error states
* Use server-side validation in API routes
* Protect all dashboard routes
* Never expose JWT secret or database URL to client

---

## Authentication Rules

* Store JWT securely using HTTP-only cookie if possible
* Use middleware to protect `/dashboard`
* Redirect logged-in users away from `/login`
* Clear token on logout
* Return proper error message for invalid credentials

---

## Validation Rules

Use Zod schemas for:

* Login
* Create Job
* Update Job
* Create Candidate
* Update Candidate
* Create Application
* Update Application Stage

Required fields:

Job:

* title
* department
* location
* description
* status

Candidate:

* fullName
* email
* phone

Application:

* candidateId
* jobId
* stage

---

## Completion Checklist

Before considering the task complete, verify:

* Login works with seeded admin user
* Dashboard route is protected
* Logout works
* Dashboard stats display correct data
* Jobs can be listed, searched, filtered, created, edited, and deleted
* Candidates can be listed, created, edited, and deleted
* Applications can be listed and moved between stages
* Prisma seed works
* Forms have validation
* Loading states are implemented
* Empty states are implemented
* Error states are implemented
* UI is responsive
* No TypeScript errors
* No ESLint errors
* App builds successfully

Run:

```bash
npm run lint
npm run build
```

---

## Scope Control

Do not implement unless explicitly requested:

* Public job board
* Candidate self-registration
* CV upload
* Email notification
* Interview scheduling
* Multi-role authorization
* Complex analytics
* Drag-and-drop pipeline
* Real-time updates
* Payment or subscription features

Keep the project simple and focused on the technical test requirements.
