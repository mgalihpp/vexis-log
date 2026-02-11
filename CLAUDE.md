# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev` (runs on port 3000)
- **Build Production:** `npm run build`
- **Run Tests:** `npm run test`
- **Single Test:** `npx vitest <path-to-test-file>`
- **Linting:** `npm run lint` or `npm run check` (lint + format fix)
- **Formatting:** `npm run format`
- **Database (Prisma):**
  - `npm run db:generate` - Generate Prisma client
  - `npm run db:push` - Push schema changes to MongoDB
  - `npm run db:studio` - Open Prisma Studio for data browsing

## Project Architecture

### Core Framework

- **Framework:** TanStack Start (Full-stack React framework built on Vite).
- **Routing:** File-based routing via TanStack Router in `src/routes/`.
- **Data Fetching:** Combines TanStack Start loaders (server-side) and TanStack Query (client-side).
- **Styling:** Tailwind CSS 4.0 with Shadcn/UI components.

### Folder Structure

- `src/routes/`: Route definitions and page layouts.
- `src/features/`: Modularized business logic (e.g., `dashboard`, `trade`, `settings`). Each feature contains its own `components/`, `types.ts`, and `constants/`.
- `src/components/ui/`: Shared UI components (mostly Shadcn/UI).
- `src/utils/`: Shared utilities. Files ending in `.server.ts` or `.functions.ts` often contain server-side logic/functions used by loaders.
- `src/lib/`: Library initializations (e.g., `db.ts` for Prisma).
- `prisma/`: Database schema (`schema.prisma`) for MongoDB.

### Coding Patterns

- **Server Functions:** Heavy use of TanStack Start's server functions for database interactions.
- **Loaders:** Routes use `loader` functions for data pre-fetching, which often call utilities in `src/utils`.
- **Form Handling:** `react-hook-form` with `zod` for schema validation (see `src/utils/schema/`).
- **Icons:** `lucide-react` is the standard icon library.
- **Date Handling:** `date-fns` for all date formatting and calculations.
