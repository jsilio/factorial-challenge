# factorial-challenge

A full-stack MVP for Markus' Bike Shop, enabling customers and staff to configure custom bikes, enforce compatibility rules, and calculate dynamic pricing in real time.

---

## 🏗️ Project Overview

This project is a monorepo built with modern TypeScript tooling (Next.js, tRPC, Prisma, Tailwind, shadcn/ui). It uses **Turborepo** for monorepo orchestration and **pnpm workspaces** for efficient dependency management. Users can select bike parts, business rules are enforced for valid configurations, and prices—including combination-based adjustments—are calculated instantly.

---

## 🚦 Getting Started

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

## 📜 Available Scripts

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

---

## 🗺️ Architecture Overview

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

---

## 📂 Project Structure

```
factorial-challenge/
├── apps/
│   ├── web/         # Frontend (Next.js)
│   └── server/      # Backend (Hono, tRPC, Prisma)
```

---

## ✨ Key Features

- **Bike Configurator UI**:  
  Select frame, finish, wheels, rim color, and chain.  
  Options update dynamically based on rules.

- **Rules Engine**:  
  Prevents invalid combinations (e.g., mountain wheels only with full-suspension frames).  
  Rules are stored in the database and enforced on the backend.

- **Dynamic Pricing**:  
  Prices are calculated in real time, including adjustments for specific combinations (e.g., matte finish costs more for full-suspension frames).

- **Error Handling & Feedback**:  
  Invalid configurations are clearly flagged, with actionable feedback and reset options.

---

## 🧠 Design Decisions & Trade-offs

- **tRPC** was chosen for end-to-end type safety and rapid prototyping.
- **Rules and pricing logic** are centralized in the backend for maintainability and extensibility.
- **UI disables or flags invalid options** based on backend validation, ensuring a smooth user experience.
- **Seed data** covers all challenge requirements and is easy to extend.

**Trade-offs:**

- No admin UI for managing parts/rules (could be added).
- Minimal test coverage due to time constraints (see below for improvements).

---

## 🛠️ Rules & Pricing System

- **Rules**:  
  Defined in the database (`compatibilityRule` table).  
  Example: Mountain wheels are only compatible with full-suspension frames.

- **Pricing**:  
  Each part has a base price.  
  Additional pricing rules (in `pricingRule` table) allow for combination-based adjustments.  
  Example: Matte finish costs +10€ for full-suspension frames.

- **Backend Logic**:
  - On each configuration change, the backend:
    - Validates selections against compatibility rules.
    - Calculates the total price, applying any relevant pricing rules.
    - Returns a breakdown and any errors to the frontend.

---

## 🧩 Extensibility

- **Adding new parts**:  
  Add to the `partOption` table and update the seed script.

- **Adding new rules**:  
  Add to the `compatibilityRule` or `pricingRule` tables.

- **UI**:  
  Dynamically renders categories and options from backend data—no hardcoding.

---

## Future Improvements

- **Testing**:  
  No automated tests were implemented due to time constraints. With more time, I would add:

  - Unit tests for rules and pricing logic (backend)
  - Integration tests for API endpoints
  - E2E tests for the configurator UI

- **Admin UI**:  
  A simple admin interface for managing parts, rules, and pricing.

- **User Accounts**:  
  Support for saving and retrieving user configurations.

- **Accessibility & UX**:  
  More visual feedback, accessibility improvements, and polish.

---
