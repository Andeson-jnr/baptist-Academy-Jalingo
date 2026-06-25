# Implementation Plan - Batist Academy Portal Transition to Supabase

Integrating Supabase for real-world authentication and persistent data storage, moving away from the previous `localStorage` simulation. This transition will implement a hybrid role assignment system where users can sign up/in generally, and admins assign roles later.

## Scope Summary
- **Authentication:** Replace mock auth with Supabase Auth (Signup/Signin).
- **Database:** Migrate `localStorage` schemas to PostgreSQL tables.
- **User Roles:** Implement RBAC using a `profiles` table linked to `auth.users`.
- **Portal Modules:** Update Admission, Student Management, and Result Management to use Supabase client.

## Auth & RLS model
**Auth in scope:** yes
**Model:** supabase_auth
**RLS strategy:** 
- `profiles`: Public read for own record; Admin read/write for all.
- `applications`: Authenticated users can create/read own; Admins read/write all.
- `results`: Teachers write assigned; Form Masters review; Students read own; Admins full access.
**Frontend implication:** Toast errors on RLS denial; Protected routes check Supabase session.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** yes (via prompt response)

## Affected Areas
- `src/context/AuthContext.tsx`: Update to use `supabase.auth`.
- `src/pages/Login.tsx`: Add Signup toggle and connect to Supabase.
- `src/lib/supabase.ts`: New Supabase client initialization.
- `supabase/migrations/`: New SQL schema for users, roles, and modules.

## Ordered Phases

### Phase 1: Supabase Setup (supabase_engineer)
- Create `profiles` table with `id` (FK to auth.users), `full_name`, `role`, `email`.
- Create `roles` enum: `SUPER_ADMIN`, `PRINCIPAL`, `TEACHER`, `STUDENT`, etc.
- Implement RLS policies for `profiles`.
- Create initial tables for `applications` and `results`.
- **Deliverable:** Database schema and RLS policies active.

### Phase 2: Auth Integration (frontend_engineer)
- Run `bun add @supabase/supabase-js`.
- Create `src/integrations/supabase/client.ts`.
- Rewrite `src/context/AuthContext.tsx` to handle Supabase sessions and profile fetching.
- Update `src/pages/Login.tsx` with Signup/Signin functionality.
- **Deliverable:** Users can sign up and sign in via Supabase.

### Phase 3: Profile & Role Management (frontend_engineer)
- Create a "User Management" view for Admins to assign roles to new signups.
- Update Dashboard components to fetch data from Supabase instead of `mockData.ts`.
- **Deliverable:** Admins can manage user roles and dashboards reflect real DB data.

### Phase 4: Module Migration (frontend_engineer)
- Migrate `AdmissionsModule` to use Supabase CRUD.
- Migrate `ResultsModule` to use Supabase CRUD.
- **Deliverable:** Core portal features are fully persistent.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. supabase_engineer — Initialize database schema and RLS.
2. frontend_engineer — Install dependencies and integrate Auth.
3. frontend_engineer — Implement role assignment UI and migrate data modules.

**Per-agent instructions:**

### 1. supabase_engineer
- **Phases:** 1
- **Scope:** Create the core schema. Focus on the `profiles` table to support the user's role assignment requirement.
- **Files:** `supabase/migrations/<timestamp>_init.sql`
- **Depends on:** none
- **Acceptance criteria:** Tables `profiles`, `applications`, `results` exist with RLS policies that prevent unauthorized access.

### 2. frontend_engineer
- **Phases:** 2, 3, 4
- **Scope:** Connect the UI to Supabase. Replace `localStorage` logic. Add Signup UI to the login page.
- **Files:** `src/context/AuthContext.tsx`, `src/pages/Login.tsx`, `src/integrations/supabase/client.ts`.
- **Depends on:** supabase_engineer
- **Acceptance criteria:** Users can register (defaulting to no role/guest). Admins can update roles. Admissions and Results persist in the database.
