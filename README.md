# Vexis Log

Vexis Log is a full-stack trading journal app to help traders log context, review execution quality, and measure performance over time.

Built with TanStack Start + React, Prisma, and Tailwind CSS.

## Repository

- Repo: `https://github.com/mgalihpp/vexis-log`
- Issues: `https://github.com/mgalihpp/vexis-log/issues`
- Pull Requests: `https://github.com/mgalihpp/vexis-log/pulls`

## Core Features

- Trade journal flow with structured fields (setup, execution, psychology, review)
- Dashboard analytics (win rate, performance metrics, equity insights)
- Trade list filtering and grouped views
- Authentication flow (login/signup + session-based access)
- Landing pages and legal page for product presentation

## Screenshots

### Feature 1

![Feature 1](public/features1.png)

### Feature 2

![Feature 2](public/features2.png)

### Feature 3

![Feature 3](public/features3.png)

### Feature 4

![Feature 4](public/features4.png)

### Feature 5

![Feature 5](public/features5.png)

## Tech Stack

- TanStack Start + TanStack Router
- React 19 + TypeScript
- Tailwind CSS 4 + custom UI components
- Prisma + MongoDB
- Vitest for testing
- ESLint + Prettier + Husky + lint-staged

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Environment

Create `.env` with your database connection string:

```bash
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret"
```

### 3) Generate Prisma client

```bash
npm run db:generate
```

### 4) Start dev server

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

```bash
npm run dev          # start development server
npm run build        # production build
npm run preview      # preview production build
npm run test         # run tests
npm run lint         # run eslint
npm run format       # run prettier
npm run check        # prettier + eslint fix
npm run db:generate  # prisma generate
npm run db:push      # push schema to database
npm run db:studio    # prisma studio
```

## Project Structure

```text
src/
  components/
    landing/         # landing page sections
    ui/              # shared UI components
  features/          # feature modules (dashboard, trade, settings)
  routes/            # file-based route definitions
  utils/             # shared utilities and server functions
prisma/
  schema.prisma      # database schema
public/
  features1-5.png    # README screenshots
```

## Development Workflow

1. Create a feature branch from `master`
2. Make focused commits
3. Run checks locally (`npm run test`, `npm run build`)
4. Open a PR and link relevant issue

## Issues and Pull Requests

### Report an Issue

- Use Issues: `https://github.com/mgalihpp/vexis-log/issues`
- Include reproduction steps, expected result, and actual result
- Add screenshots or logs if relevant

### Open a Pull Request

- Open PR here: `https://github.com/mgalihpp/vexis-log/pulls`
- Keep PR scoped to one logical change
- Include summary, screenshots (if UI changes), and test notes

## Notes

- Some TypeScript errors may exist in unrelated older modules; keep new changes isolated and verified with build/tests.
- Husky pre-commit hooks run lint/format on staged files.
