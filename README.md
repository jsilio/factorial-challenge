# factorial-challenge

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Hono, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **SQLite** - Database engine
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses SQLite with Prisma.

1. Create a `.env` file in the `apps/server` directory with the SQLite connection string:

```bash
cd apps/server
echo "DATABASE_URL=\"file:./dev.db\"" > .env
```

2. Generate the Prisma client and push the schema:

```bash
cd apps/server && pnpm db:generate && pnpm db:push
```

3. Seed the database with initial bike parts and configuration data:

```bash
cd apps/server && pnpm db:seed
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
factorial-challenge/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Hono, TRPC)
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
- `pnpm db:seed`: Seed the database with initial data
