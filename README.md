# Mini Recruitment Dashboard

A robust, full-stack Recruitment Dashboard application built as a technical test. This system serves as an internal dashboard for recruiters to effectively manage job vacancies, track candidate pipelines, and review key recruitment metrics.

## 🚀 Features

### Core Functionality
- **Secure Authentication**: Protected dashboard routes utilizing NextAuth.js (Credentials Provider) with JWT tokens.
- **Dashboard Overview**: Essential statistic cards summarizing Total Jobs, Total Candidates, and Total Applications, alongside a pipeline snapshot.
- **Job Management**: Complete CRUD operations for job vacancies with advanced search filtering (by title) and status filtering (OPEN/CLOSED).
- **Candidate Management**: Comprehensive candidate tracking detailing their applications and their current stage in the recruitment process.
- **Interactive Pipeline Kanban**: A streamlined visual pipeline board mapping candidates to stages (`APPLIED`, `INTERVIEW`, `HIRED`). Includes quick-action dropdowns to seamlessly transition applicants between stages without refreshing the page.

### Design & UX
- Modern, clean, SaaS-style interface.
- Fully responsive design gracefully adjusting from mobile to desktop screens.
- Collapsible sidebar for enhanced screen real-estate.
- Beautiful UI components via Shadcn UI and styled with Tailwind CSS.
- Robust form validations with helpful error messages.
- Optimistic UI updates and toast notifications on successful actions.

---

## 💻 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Neon Serverless compatibility via `pg.Pool` & `@prisma/adapter-pg`)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with `bcryptjs`
- **Data Fetching/Mutation**: [TanStack Query](https://tanstack.com/query/latest) & Next.js Server Actions
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database instance

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd job-application-next
npm install
```

### 2. Environment Configuration

Rename `.env.example` to `.env` (or create a `.env` file) and configure the environment variables:

```env
#PostgreSQL Database Connection String
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-for-jwt"
```

### 3. Database Setup & Seeding

The project utilizes Prisma. First, generate the Prisma Client and push the schema to your database. Then, run the seed script to populate mock data (jobs, candidates, and applications).

```bash
# Push schema to the database
npx prisma db push

# Seed the database with initial users and data
npm run build # Ensure typescript compiler runs cleanly for seed if necessary
npx prisma db seed
```

**Seeded Admin Credentials:**
- **Email:** `admin@recruit.com`
- **Password:** `password123`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. You will be prompted to log in using the credentials provided above.

---

## 🏗️ Architecture & Folder Structure

The app enforces a clean architectural separation of concerns leveraging Next.js Server Actions. Here is a high-level overview of the project structure:

```txt
├── app/
│   ├── api/                  # NextAuth and other API routes
│   ├── login/                # Authentication page
│   ├── dashboard/            # Protected application routes
│   │   ├── jobs/             # Job management module
│   │   ├── candidates/       # Candidate management module
│   │   └── pipeline/         # Interactive Kanban board
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing/root page
│
├── components/
│   ├── ui/                   # Shadcn UI base components
│   ├── layout/               # Sidebar, Topbar, structural UI
│   ├── shared/               # Reusable features (badges, boards)
│   ├── tables/               # Data tables (Jobs, Candidates)
│   └── forms/                # React Hook Forms (Create/Edit)
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeder script
│
├── server/
│   ├── actions/              # Next.js Server Actions (Mutations)
│   ├── repository/           # Direct Prisma database queries
│   ├── schemas/              # Zod validation schemas
│   └── service/              # Business logic layer
│
├── hooks/                    # Custom React hooks (e.g. use-mobile)
├── lib/                      # Utilities and configurations (e.g. Prisma client)
└── types/                    # TypeScript type definitions
```

### Layer Details
- `server/service/*`: Encapsulates core business logic and API orchestration.
- `server/repository/*`: Handles direct Prisma database interactions.
- `server/actions/*`: Next.js Server Actions that seamlessly link frontend forms to backend services securely.
- `components/*`: Reusable UI elements decoupled from business logic.

---

## ✅ Deployment

The app is optimized for standard deployment environments like Vercel or Railway.

To create a production build:
```bash
npm run build
npm start
```
*Note: Ensure your production environment provides a PostgreSQL database and valid `DATABASE_URL` and `NEXTAUTH_SECRET` environment variables.*
