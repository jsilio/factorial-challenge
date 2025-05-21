# Factorial Challenge

A full-stack MVP for Markus' Bike Shop, enabling customers and staff to configure custom bikes, enforce compatibility rules, and calculate dynamic pricing in real time.

## Project Overview

This project is a monorepo built with modern TypeScript tooling (Next.js, tRPC, Prisma, Tailwind, shadcn/ui). It uses **Turborepo** for monorepo orchestration and **pnpm workspaces** for efficient dependency management. Users can select bike parts, business rules are enforced for valid configurations, and prices—including combination-based adjustments—are calculated instantly.

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/) (recommended version: 10.x or above)
- Node.js (18+)

### Install dependencies

```bash
pnpm install
```

### Database Setup

This project uses SQLite with Prisma. To set up the database:

1. Create a `.env` file in the `apps/server` directory with the SQLite connection string:
   ```bash
   cd apps/server
   echo "DATABASE_URL=\"file:./dev.db\"" > .env
   ```
2. Generate the Prisma client and push the schema:
   ```bash
   pnpm db:generate && pnpm db:push
   ```
3. Seed the database with initial bike parts and configuration data:
   ```bash
   pnpm db:seed
   ```
4. Return to the root and start the development servers:
   ```bash
   cd ../..
   pnpm dev
   ```

- Web app: [http://localhost:3001](http://localhost:3001)
- API: [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

All scripts are run from the root using Turborepo and pnpm workspaces:

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
- `pnpm db:generate`: Generate Prisma client
- `pnpm db:migrate`: Run database migrations
- `pnpm db:seed`: Seed the database with initial data
- `pnpm format`: Format codebase with Prettier

## Project Structure

```
factorial-challenge/
├── apps/
│   ├── web/         # Frontend (Next.js)
│   └── server/      # Backend (Hono, tRPC, Prisma)
```

## Architecture Overview

- **Frontend (`apps/web`)**:  
  Built with Next.js and React, using react-query for data fetching and react-hook-form for form state.  
  Communicates with the backend via tRPC for type-safe, real-time data and validation.

- **Backend (`apps/server`)**:  
  Built with Hono and tRPC, using Prisma ORM and SQLite.  
  Exposes endpoints for:

  - Fetching available part options
  - Enforcing compatibility rules
  - Calculating prices (including combination-based adjustments)
  - Centralizing all business logic for maintainability

- **Database**:  
  SQLite, seeded with all parts, rules, and pricing logic.

## Design Decisions & Trade-offs

- **tRPC** was chosen for end-to-end type safety and rapid prototyping.
- **Rules and pricing logic** are centralized in the backend for maintainability and extensibility.
- **UI disables or flags invalid options** based on backend validation, ensuring a smooth user experience.
- **Seed data** covers all challenge requirements and is easy to extend.

**Trade-offs:**

- No bike preview images/renderings
- No admin UI for managing parts/rules
- Minimal test coverage due to time constraints
