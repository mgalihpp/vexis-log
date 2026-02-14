# Vexis Log

Vexis Log is a trading journal application for recording trades, reviewing execution quality, and tracking performance over time.

## Features

- Authentication with JWT cookie session
- Trade journaling flow (quick add and detailed multi-step form)
- Analytics dashboard (equity curve, win rate, and performance breakdowns)
- Trade history with detail view, edit, and delete actions
- User settings (profile, password, and appearance)

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM + MongoDB
- TanStack Query
- Tailwind CSS 4 + shadcn/ui
- Vitest + Testing Library

## Project Structure

```text
src/
  app/          # Next.js routes, layouts, and API routes
  components/   # Shared UI components
  features/     # Feature modules (analytics, dashboard, settings, trade)
  hooks/        # Reusable React hooks
  lib/          # Core libs and integrations (db, auth, etc.)
  types/        # Shared TypeScript types
  utils/        # Utilities, schema validation, server functions
prisma/         # Prisma schema and seed script
public/         # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB connection string

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
npm run db:generate
npm run db:push
```

Optional seed:

```bash
npm run db:seed
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build production application
- `npm run start` - start production server
- `npm run test` - run test suite (Vitest)
- `npm run lint` - run ESLint
- `npm run format` - run Prettier
- `npm run check` - run Prettier write + ESLint fix
- `npm run db:generate` - generate Prisma client
- `npm run db:pull` - pull schema from database
- `npm run db:push` - push schema to database
- `npm run db:studio` - open Prisma Studio
- `npm run db:seed` - run database seed script

## Testing

Run all tests:

```bash
npm run test
```

Run a single test file:

```bash
npx vitest <path-to-test-file>
```

## Build for Production

```bash
npm run build
npm run start
```

## Reporting Issues

If you find a bug or want to request a feature, please open a GitHub Issue and include:

- A clear title and short description
- Steps to reproduce (for bugs)
- Expected result vs actual result
- Screenshots or logs (if relevant)
- Environment details (OS, Node.js version, browser)

Please check existing issues first to avoid duplicates.

## Contributing

Contributions are welcome.

1. Fork this repository
2. Create a feature branch: `git checkout -b feat/your-change`
3. Install dependencies: `npm install`
4. Make your changes and run checks:
   - `npm run test`
   - `npm run lint`
   - `npm run build`
5. Commit with a clear message
6. Push your branch and open a Pull Request

When opening a PR, include the problem being solved, a brief summary of the solution, and any testing evidence.
