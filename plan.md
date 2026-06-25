# Implementation Plan - Batist Academy School Management Portal

Building a comprehensive school management portal for Batist Academy, Jalingo. Due to session constraints, this will be a high-fidelity frontend-only implementation using React, Tailwind CSS, and client-side state management (localStorage) to simulate a full-stack experience.

## Scope Summary
- **Landing Website:** Professional school website (Home, About, Academics, Admissions, etc.).
- **Authentication:** Role-based login (Admin, Principal, Teacher, Student, Parent, Applicant).
- **Modules:** Admission, Student/Staff Management, Result Management (Workflow), Fees, Attendance, Timetable, Library, and CBT.
- **Dashboards:** Customized views for every role.
- **Data Layer:** Client-side mock data with persistence via `localStorage`.

## Non-Goals
- Real MySQL/Node.js backend (Session constraints: Frontend-only).
- Real PDF generation via `PDFKit` (will use browser `window.print()` or mock PDF previews).
- Real Email/SMS notifications (will be simulated in-app).
- Real Payment Gateways (will use Paystack/Flutterwave sandbox UI simulations).

## Assumptions & Open Questions
- **Assumption:** The user's request for "MySQL/Node.js" is a specification for a real-world product, but since this environment is restricted to frontend only, we will build a "Demo-Ready" frontend that mirrors that logic.
- **Open Question:** Are there specific color schemes for Batist Academy? (Defaulting to professional academic blues/golds).

## Affected Areas
- `src/App.tsx`: Main routing and layout wrapper.
- `src/components/`: New shared components (Navbar, Sidebar, Footer, UI elements).
- `src/pages/`: Landing pages and Dashboard views.
- `src/hooks/`: Custom hooks for mock auth and data management.
- `src/context/`: AuthContext and DataContext for state.

## Ordered Phases

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up Routing (`react-router-dom`).
- Create main layout wrappers (Public Layout vs. Dashboard Layout).
- Implement `AuthContext` with mock user roles.
- **Deliverable:** Basic routing structure and shell for all roles.

### Phase 2: Landing Website (frontend_engineer)
- Build Home, About, Academics, and Admissions pages.
- Implement Hero slider and AOS-like animations (using `framer-motion`).
- **Deliverable:** Professional public-facing website.

### Phase 3: Authentication & Dashboards (frontend_engineer)
- Create specialized Login pages for different roles.
- Build unique Dashboard homepages for:
    - Super Admin (Analytics overview)
    - Staff (Assigned subjects)
    - Student (Quick links to results/timetable)
- **Deliverable:** Functional login and personalized dashboard entry points.

### Phase 4: Core Modules - Admission & Management (frontend_engineer)
- **Admission Module:** Application form with validation and status tracking.
- **Management:** CRUD interfaces for Students, Staff, Classes, and Subjects (storing in localStorage).
- **Deliverable:** Working forms for data entry and listing.

### Phase 5: Result Workflow & Academic Modules (frontend_engineer)
- **Result Workflow:** Teacher entry -> Form Master review -> Admin approval -> Student view.
- **Academic:** Attendance marking, Timetable display, Library catalog.
- **Deliverable:** The complex result computation engine and approval flow.

### Phase 6: Fees & CBT (frontend_engineer)
- **Fees:** Invoice listing and simulated payment gateway UI.
- **CBT:** Quiz interface with timer and auto-marking.
- **Deliverable:** Simulated financial and examination tools.

### Phase 7: Final Polish & Reports (quick_fix_engineer)
- Refine CSS/Tailwind styles.
- Add "Print Result" CSS optimizations.
- Final bug fixes and UI consistency checks.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup routing, auth, and layout foundations.
2. frontend_engineer — Build landing site and role-specific dashboards.
3. frontend_engineer — Implement core business modules (Results, Admissions, Fees).
4. quick_fix_engineer — Polish UI and print styles.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5, 6
- **Scope:** Complete UI/UX implementation. Focus on role-based access control (simulated). Use `localStorage` to persist "Student" or "Result" data across sessions.
- **Files:** `src/App.tsx`, `src/pages/**/*`, `src/components/**/*`.
- **Depends on:** none
- **Acceptance criteria:** All roles can log in. Teachers can enter scores. Admins can approve results. Students can see their results. Landing page is professional.

### 2. quick_fix_engineer
- **Phases:** 7
- **Scope:** Audit the UI for responsiveness. Ensure the "Report Card" view looks perfect when printed. Fix any alignment issues in the dashboards.
- **Files:** `src/index.css`, various components.
- **Depends on:** frontend_engineer
- **Acceptance criteria:** High-polish finish on all dashboard widgets and the public website.
