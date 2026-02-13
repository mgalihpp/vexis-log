# AGENTS.md

This file provides guidance to agentic coding agents (such as Claude Code) when working with code in this repository.

## Development Commands

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev` (runs on port 3000)
- **Build Production:** `npm run build`
- **Start Production:** `npm run start`
- **Run Tests:** `npm run test`
- **Single Test:** `npx vitest <path-to-test-file>`
- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Combined Lint & Format:** `npm run check`
- **Database (Prisma):**
  - `npm run db:generate` - Generate Prisma client
  - `npm run db:push` - Push schema changes to MongoDB
  - `npm run db:studio` - Open Prisma Studio for data browsing
  - `npm run db:seed` - Seed database with initial data

## Project Architecture

### Core Framework

- **Framework:** Next.js 16 (App Router) - Note: This is actually a Next.js app, not TanStack Start as originally described
- **Routing:** File-based routing via Next.js App Router in `src/app/`
- **Data Fetching:** Server-side data fetching via API routes and server functions, client-side data fetching with TanStack Query
- **Styling:** Tailwind CSS 4.0 with Shadcn/UI components

### Folder Structure

- `src/app/`: Next.js App Router pages and layouts
- `src/features/`: Modularized business logic (e.g., `dashboard`, `trade`, `settings`). Each feature contains its own `components/`, `types.ts`, and `constants/`
- `src/components/ui/`: Shared UI components (Shadcn/UI patterns)
- `src/utils/`: Shared utilities. Files ending in `.server.ts` contain server-side logic/functions used by API routes
- `src/lib/`: Library initializations (e.g., `db.ts` for Prisma)
- `prisma/`: Database schema (`schema.prisma`) for MongoDB

## Code Style Guidelines

### Import Patterns and Organization

1. **Order of imports:**

   ```typescript
   // 1. React and third-party libraries
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";

   // 2. Internal project imports (with aliases)
   import { tradeSchema } from "@/utils/schema/tradeSchema";
   import { createTrade } from "@/utils/dashboard.functions";
   import { TradeForm } from "@/features/trade/components/TradeForm";
   import { cn } from "@/lib/utils";

   // 3. Relative imports
   import { TradeStepExecution } from "./steps/TradeStepExecution";
   ```

2. **Use absolute aliases for internal imports:** Always use `@/` prefix for internal imports
3. **Group related imports logically**

### Component Naming and Structure

1. **Component naming:** Use PascalCase (e.g., `TradeForm.tsx` → `TradeForm` component)
2. **File organization:** Mirror component names with file names
3. **Feature-based organization:**
   ```
   src/features/trade/
   ├── components/
   │   ├── TradeForm.tsx
   │   ├── TradeList.tsx
   │   └── steps/
   │       ├── TradeStepInfo.tsx
   │       └── TradeStepExecution.tsx
   ├── types.ts
   └── constants/
       └── options.ts
   ```

### TypeScript Usage Patterns

1. **Strong typing with Zod:**

   ```typescript
   // Define schema
   export const tradeSchema = z.object({
     date: z.string().min(1, "Please enter a date."),
     market: z.string().min(1, "Please select a market."),
     // ... other fields
   });

   // Export derived types
   export type TradeFormInput = z.input<typeof tradeSchema>;
   export type TradeFormValues = z.output<typeof tradeSchema>;
   ```

2. **Use generics with react-hook-form:**

   ```typescript
   const form = useForm<TradeFormInput>({
     resolver: zodResolver(tradeSchema),
     defaultValues: {},
   });
   ```

3. **Type re-exports:** Centralize type exports in dedicated files
   ```typescript
   // src/types/trade.ts
   export { Trade } from "@prisma/client";
   ```

### Error Handling Approaches

1. **Client-side fetch wrappers:** Centralize error handling

   ```typescript
   // src/utils/dashboard.functions.ts
   export async function readJson<T>(response: Response): Promise<T> {
     const data = await response.json();
     if (!response.ok) {
       throw new Error(data.error || "Request failed");
     }
     return data;
   }
   ```

2. **UI-level error feedback:** Use toast notifications

   ```typescript
   try {
     // API call
   } catch (error) {
     showToast("error", error instanceof Error ? error.message : "Failed");
   }
   ```

3. **Server-side validation:** Use Zod schemas for input validation
   ```typescript
   // src/utils/trade-crud.server.ts
   const validatedData = tradeSchema.parse(payload);
   ```

### Styling Conventions (Tailwind, Shadcn UI)

1. **Use Tailwind utility classes:** Prefer descriptive class names

   ```typescript
   <div className="bg-card text-muted-foreground border-border rounded-lg">
   ```

2. **Shadcn UI components:** Use shared UI primitives

   ```typescript
   import { Card, CardContent, CardHeader } from "@/components/ui/card";
   import { Button } from "@/components/ui/button";
   ```

3. **Class composition:** Use the `cn` utility for merging classes
   ```typescript
   // src/lib/utils.ts
   export function cn(...inputs: Array<ClassValue>) {
     return twMerge(clsx(inputs));
   }
   ```

### File Organization Patterns

1. **Feature-based structure:**

   ```
   src/features/<domain>/
   ├── components/          # UI components for this feature
   ├── types.ts           # Feature-specific types
   ├── constants/         # Configuration constants
   └── utils/             # Feature utilities
   ```

2. **Shared utilities:**
   - `src/utils/schema/`: Zod validation schemas
   - `src/utils/dashboard.functions.ts`: API wrappers
   - `src/utils/trade-crud.server.ts`: Server-side business logic

3. **UI components:**
   - `src/components/ui/`: Shared UI primitives
   - Feature-specific components in respective `features/` directories

### Server Function Patterns

1. **API route structure:**

   ```typescript
   // src/app/api/trades/route.ts
   import { requireServerAuth } from "@/lib/auth-session";
   import { getAllTrades } from "@/utils/dashboard.server";

   export async function GET() {
     try {
       const user = await requireServerAuth();
       const trades = await getAllTrades(user.id);
       return NextResponse.json(trades);
     } catch (error) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
   }
   ```

2. **Server-side logic separation:**
   - `src/utils/trade-crud.server.ts`: Business logic and data mapping
   - `src/utils/dashboard.server.ts`: Data access functions
   - API routes handle HTTP concerns and authentication

### Form Handling Patterns (react-hook-form + zod)

1. **Form validation setup:**

   ```typescript
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { tradeSchema } from "@/utils/schema/tradeSchema";

   const form = useForm<TradeFormInput>({
     resolver: zodResolver(tradeSchema),
     defaultValues: {},
   });
   ```

2. **Form field rendering:**

   ```typescript
   <form {...form}>
     <FormField
       control={form.control}
       name="market"
       render={({ field }) => (
         <FormItem>
           <FormLabel>Market</FormLabel>
           <FormControl>
             <Combobox onValueChange={field.onChange} value={field.value}>
               {/* Options */}
             </Combobox>
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
   </form>
   ```

3. **Derived values:** Use `useWatch` for reactive calculations
   ```typescript
   const entryPrice = useWatch({ control, name: "entryPrice" });
   const stopLoss = useWatch({ control, name: "stopLoss" });
   // Calculate derived values
   ```

### External Dependencies Usage

1. **Database (Prisma + MongoDB):**
   - Define models in `prisma/schema.prisma`
   - Use centralized Prisma client in `src/lib/db.ts`
   - Server-side data access only

2. **Data Fetching:**
   - Server-side: API routes and server functions
   - Client-side: TanStack Query for caching and updates

3. **Form Handling:**
   - `react-hook-form` for state management
   - `zod` for validation schemas
   - `@hookform/resolvers/zod` for integration

4. **UI Components:**
   - `shadcn/ui` for pre-styled components
   - `lucide-react` for icons
   - `tailwindcss` for styling

5. **Date Handling:**
   - Use `date-fns` for all date operations
   - Consistent formatting and calculations

## Cursor Rules

No specific Cursor rules found in this repository.

## Copilot Rules

No specific Copilot rules found in this repository.

## Testing Guidelines

1. **Test files:** Place test files alongside source files in `__tests__` directories
2. **Test runner:** Use Vitest (`npm run test`)
3. **Single test execution:** `npx vitest <path-to-test-file>`
4. **Test structure:** Follow existing patterns in `src/utils/__tests__/`

## Commit Guidelines

- Use `husky` pre-commit hooks for linting and formatting
- Run `npm run check` before committing to ensure code quality
- Follow conventional commit messages when possible

## Environment Setup

1. **Prerequisites:**
   - Node.js 20+
   - npm
   - MongoDB database URL

2. **Environment variables:**

   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Setup steps:**
   ```bash
   npm install
   npm run db:generate
   npm run dev
   ```
