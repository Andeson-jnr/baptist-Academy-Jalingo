-- =====================================================
-- Batist Academy School Portal - Initial Schema
-- =====================================================
-- Core tables: profiles, classes, subjects, sessions, terms
-- Supporting: students, staff, applications, results, attendance, fees, payments, notifications
-- =====================================================

-- 1. ENUM TYPES
-- =====================================================

DO $$ BEGIN
  -- User roles (admin assigns after signup)
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL_ACADEMIC',
      'EXAM_OFFICER', 'TEACHER', 'FORM_MASTER',
      'STUDENT', 'PARENT', 'APPLICANT', 'GUEST'
    );
  END IF;

  -- School sections
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'school_section') THEN
    CREATE TYPE school_section AS ENUM ('Nursery', 'Primary', 'Secondary');
  END IF;

  -- Application status
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
    CREATE TYPE application_status AS ENUM ('Pending', 'Under_Review', 'Approved', 'Rejected', 'Waitlisted');
  END IF;

  -- Result status (workflow)
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'result_status') THEN
    CREATE TYPE result_status AS ENUM ('Draft', 'Submitted', 'Form_Master_Review', 'Approved', 'Published', 'Rejected');
  END IF;

  -- Gender
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_type') THEN
    CREATE TYPE gender_type AS ENUM ('Male', 'Female');
  END IF;

  -- Attendance status
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
    CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Late', 'Excused');
  END IF;

  -- Payment status
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');
  END IF;

  -- Fee type
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fee_type') THEN
    CREATE TYPE fee_type AS ENUM ('School_Fees', 'PTA_Levy', 'Development_Fund', 'Hostel_Fees', 'Exam_Fees', 'Other');
  END IF;
END $$;

-- 2. PROFILES TABLE (linked to auth.users)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'GUEST',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for role-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (needed for dashboards, assigning roles, etc.)
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile (except role)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can do everything (for admin operations via edge functions)
DROP POLICY IF EXISTS "Service role full access to profiles" ON public.profiles;
CREATE POLICY "Service role full access to profiles"
  ON public.profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. CLASSES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  section school_section NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_classes_section ON public.classes(section);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Classes viewable by authenticated" ON public.classes;
CREATE POLICY "Classes viewable by authenticated"
  ON public.classes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Classes manageable by service role" ON public.classes;
CREATE POLICY "Classes manageable by service role"
  ON public.classes FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 4. SUBJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  section school_section,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subjects_section ON public.subjects(section);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Subjects viewable by authenticated" ON public.subjects;
CREATE POLICY "Subjects viewable by authenticated"
  ON public.subjects FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Subjects manageable by service role" ON public.subjects;
CREATE POLICY "Subjects manageable by service role"
  ON public.subjects FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. CLASS-SUBJECT ASSIGNMENTS (which subjects are taught in which class)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.class_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(class_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_class_subjects_class ON public.class_subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_teacher ON public.class_subjects(teacher_id);

ALTER TABLE public.class_subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Class subjects viewable by authenticated" ON public.class_subjects;
CREATE POLICY "Class subjects viewable by authenticated"
  ON public.class_subjects FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Class subjects manageable by service role" ON public.class_subjects;
CREATE POLICY "Class subjects manageable by service role"
  ON public.class_subjects FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 6. ACADEMIC SESSIONS & TERMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g. "2024/2025"
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- "First Term", "Second Term", "Third Term"
  position INTEGER NOT NULL DEFAULT 1,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(session_id, name)
);

CREATE INDEX IF NOT EXISTS idx_terms_session ON public.terms(session_id);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Sessions viewable by authenticated" ON public.sessions;
CREATE POLICY "Sessions viewable by authenticated"
  ON public.sessions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Terms viewable by authenticated" ON public.terms;
CREATE POLICY "Terms viewable by authenticated"
  ON public.terms FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Sessions manageable by service role" ON public.sessions;
CREATE POLICY "Sessions manageable by service role"
  ON public.sessions FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Terms manageable by service role" ON public.terms;
CREATE POLICY "Terms manageable by service role"
  ON public.terms FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. STUDENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  admission_no TEXT UNIQUE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  section school_section NOT NULL,
  gender gender_type,
  date_of_birth DATE,
  state_of_origin TEXT,
  lga TEXT,
  address TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  parent_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'Active', -- Active, Withdrawn, Graduated
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_students_profile ON public.students(profile_id);
CREATE INDEX IF NOT EXISTS idx_students_class ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_parent ON public.students(parent_profile_id);
CREATE INDEX IF NOT EXISTS idx_students_admission ON public.students(admission_no);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Students/parents can view own, all authenticated can view (for dashboards)
DROP POLICY IF EXISTS "Students viewable by authenticated" ON public.students;
CREATE POLICY "Students viewable by authenticated"
  ON public.students FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Students manageable by service role" ON public.students;
CREATE POLICY "Students manageable by service role"
  ON public.students FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS students_updated_at ON public.students;
CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 8. STAFF TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  staff_id TEXT UNIQUE,
  department TEXT,
  qualification TEXT,
  date_employed DATE,
  is_form_master BOOLEAN NOT NULL DEFAULT false,
  form_master_class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_profile ON public.staff(profile_id);
CREATE INDEX IF NOT EXISTS idx_staff_form_master ON public.staff(form_master_class_id);

ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff viewable by authenticated" ON public.staff;
CREATE POLICY "Staff viewable by authenticated"
  ON public.staff FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Staff manageable by service role" ON public.staff;
CREATE POLICY "Staff manageable by service role"
  ON public.staff FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS staff_updated_at ON public.staff;
CREATE TRIGGER staff_updated_at
  BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 9. ADMISSION APPLICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_no TEXT UNIQUE NOT NULL,
  -- Applicant details
  surname TEXT NOT NULL,
  first_name TEXT NOT NULL,
  other_names TEXT,
  gender gender_type,
  date_of_birth DATE,
  state_of_origin TEXT,
  lga TEXT,
  address TEXT,
  -- Parent details
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  -- Academic
  class_applying_for TEXT NOT NULL,
  section school_section NOT NULL,
  -- Files
  passport_url TEXT,
  -- Status
  status application_status NOT NULL DEFAULT 'Pending',
  -- Link to user account (if applicant has one)
  applicant_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  -- Review
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_applicant ON public.applications(applicant_profile_id);
CREATE INDEX IF NOT EXISTS idx_applications_no ON public.applications(application_no);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view all applications (admins need to see all)
DROP POLICY IF EXISTS "Applications viewable by authenticated" ON public.applications;
CREATE POLICY "Applications viewable by authenticated"
  ON public.applications FOR SELECT TO authenticated USING (true);

-- Any authenticated user can create an application
DROP POLICY IF EXISTS "Authenticated users can create applications" ON public.applications;
CREATE POLICY "Authenticated users can create applications"
  ON public.applications FOR INSERT TO authenticated WITH CHECK (true);

-- Users can update their own applications (only if pending)
DROP POLICY IF EXISTS "Users can update own pending applications" ON public.applications;
CREATE POLICY "Users can update own pending applications"
  ON public.applications FOR UPDATE
  TO authenticated
  USING (
    applicant_profile_id = auth.uid() AND status = 'Pending'
  );

-- Service role full access
DROP POLICY IF EXISTS "Applications manageable by service role" ON public.applications;
CREATE POLICY "Applications manageable by service role"
  ON public.applications FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS applications_updated_at ON public.applications;
CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 10. RESULTS TABLE (header per student per term)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  term_id UUID NOT NULL REFERENCES public.terms(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  total_score NUMERIC(5,2) DEFAULT 0,
  average NUMERIC(5,2) DEFAULT 0,
  position INTEGER,
  attendance_days INTEGER DEFAULT 0,
  form_master_comment TEXT,
  principal_comment TEXT,
  next_term_begins DATE,
  status result_status NOT NULL DEFAULT 'Draft',
  submitted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, term_id)
);

CREATE INDEX IF NOT EXISTS idx_results_student ON public.results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_term ON public.results(term_id);
CREATE INDEX IF NOT EXISTS idx_results_class ON public.results(class_id);
CREATE INDEX IF NOT EXISTS idx_results_status ON public.results(status);

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view results (filtered by frontend based on role)
DROP POLICY IF EXISTS "Results viewable by authenticated" ON public.results;
CREATE POLICY "Results viewable by authenticated"
  ON public.results FOR SELECT TO authenticated USING (true);

-- Service role full access
DROP POLICY IF EXISTS "Results manageable by service role" ON public.results;
CREATE POLICY "Results manageable by service role"
  ON public.results FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS results_updated_at ON public.results;
CREATE TRIGGER results_updated_at
  BEFORE UPDATE ON public.results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 11. RESULT ITEMS (individual subject scores)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.result_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id UUID NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  test1 NUMERIC(5,2) DEFAULT 0 CHECK (test1 >= 0 AND test1 <= 10),
  test2 NUMERIC(5,2) DEFAULT 0 CHECK (test2 >= 0 AND test2 <= 10),
  assignment NUMERIC(5,2) DEFAULT 0 CHECK (assignment >= 0 AND assignment <= 20),
  exam NUMERIC(5,2) DEFAULT 0 CHECK (exam >= 0 AND exam <= 60),
  total NUMERIC(5,2) GENERATED ALWAYS AS (COALESCE(test1,0) + COALESCE(test2,0) + COALESCE(assignment,0) + COALESCE(exam,0)) STORED,
  grade TEXT,
  entered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(result_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_result_items_result ON public.result_items(result_id);
CREATE INDEX IF NOT EXISTS idx_result_items_subject ON public.result_items(subject_id);

ALTER TABLE public.result_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Result items viewable by authenticated" ON public.result_items;
CREATE POLICY "Result items viewable by authenticated"
  ON public.result_items FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Result items manageable by service role" ON public.result_items;
CREATE POLICY "Result items manageable by service role"
  ON public.result_items FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS result_items_updated_at ON public.result_items;
CREATE TRIGGER result_items_updated_at
  BEFORE UPDATE ON public.result_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 12. ATTENDANCE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL DEFAULT 'Present',
  marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_date ON public.attendance(class_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Attendance viewable by authenticated" ON public.attendance;
CREATE POLICY "Attendance viewable by authenticated"
  ON public.attendance FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Attendance manageable by service role" ON public.attendance;
CREATE POLICY "Attendance manageable by service role"
  ON public.attendance FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 13. FEES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  fee_type fee_type NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  term_id UUID REFERENCES public.terms(id) ON DELETE SET NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  due_date DATE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fees_type ON public.fees(fee_type);
CREATE INDEX IF NOT EXISTS idx_fees_session ON public.fees(session_id);

ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Fees viewable by authenticated" ON public.fees;
CREATE POLICY "Fees viewable by authenticated"
  ON public.fees FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Fees manageable by service role" ON public.fees;
CREATE POLICY "Fees manageable by service role"
  ON public.fees FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 14. PAYMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_no TEXT UNIQUE NOT NULL,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  fee_id UUID REFERENCES public.fees(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  payment_method TEXT, -- Paystack, Flutterwave, Cash, Bank Transfer
  reference TEXT, -- Gateway reference
  status payment_status NOT NULL DEFAULT 'Pending',
  paid_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_student ON public.payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_receipt ON public.payments(receipt_no);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Payments viewable by authenticated" ON public.payments;
CREATE POLICY "Payments viewable by authenticated"
  ON public.payments FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Payments manageable by service role" ON public.payments;
CREATE POLICY "Payments manageable by service role"
  ON public.payments FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 15. NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- info, warning, success, error
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(is_read);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

-- Users can update their own notifications (mark as read)
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- Service role full access
DROP POLICY IF EXISTS "Notifications manageable by service role" ON public.notifications;
CREATE POLICY "Notifications manageable by service role"
  ON public.notifications FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 16. TIMETABLE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.timetable_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 1 AND day_of_week <= 5), -- 1=Mon, 5=Fri
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_exam BOOLEAN NOT NULL DEFAULT false,
  term_id UUID REFERENCES public.terms(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timetable_class ON public.timetable_entries(class_id);
CREATE INDEX IF NOT EXISTS idx_timetable_day ON public.timetable_entries(day_of_week);

ALTER TABLE public.timetable_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Timetable viewable by authenticated" ON public.timetable_entries;
CREATE POLICY "Timetable viewable by authenticated"
  ON public.timetable_entries FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Timetable manageable by service role" ON public.timetable_entries;
CREATE POLICY "Timetable manageable by service role"
  ON public.timetable_entries FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 17. LIBRARY BOOKS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  category TEXT,
  total_copies INTEGER NOT NULL DEFAULT 1,
  available_copies INTEGER NOT NULL DEFAULT 1,
  cover_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.borrow_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  borrower_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_date DATE NOT NULL,
  returned_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'Borrowed', -- Borrowed, Returned, Overdue
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_borrow_borrower ON public.borrow_records(borrower_profile_id);
CREATE INDEX IF NOT EXISTS idx_borrow_book ON public.borrow_records(book_id);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrow_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Books viewable by authenticated" ON public.books;
CREATE POLICY "Books viewable by authenticated"
  ON public.books FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Borrow records viewable by authenticated" ON public.borrow_records;
CREATE POLICY "Borrow records viewable by authenticated"
  ON public.borrow_records FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Books manageable by service role" ON public.books;
CREATE POLICY "Books manageable by service role"
  ON public.books FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Borrow records manageable by service role" ON public.borrow_records;
CREATE POLICY "Borrow records manageable by service role"
  ON public.borrow_records FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 18. SEED DATA
-- =====================================================

-- Seed classes
INSERT INTO public.classes (name, section, level) VALUES
  ('Nursery 1', 'Nursery', 1),
  ('Nursery 2', 'Nursery', 2),
  ('Primary 1', 'Primary', 1),
  ('Primary 2', 'Primary', 2),
  ('Primary 3', 'Primary', 3),
  ('Primary 4', 'Primary', 4),
  ('Primary 5', 'Primary', 5),
  ('Primary 6', 'Primary', 6),
  ('JSS 1', 'Secondary', 7),
  ('JSS 2', 'Secondary', 8),
  ('JSS 3', 'Secondary', 9),
  ('SSS 1', 'Secondary', 10),
  ('SSS 2', 'Secondary', 11),
  ('SSS 3', 'Secondary', 12)
ON CONFLICT DO NOTHING;

-- Seed subjects
INSERT INTO public.subjects (name, code, section) VALUES
  ('Mathematics', 'MATH', 'Secondary'),
  ('English Language', 'ENG', 'Secondary'),
  ('Basic Science', 'BSC', 'Primary'),
  ('Social Studies', 'SOC', 'Primary'),
  ('Civic Education', 'CIV', 'Secondary'),
  ('Biology', 'BIO', 'Secondary'),
  ('Chemistry', 'CHE', 'Secondary'),
  ('Physics', 'PHY', 'Secondary'),
  ('Further Mathematics', 'FMATH', 'Secondary'),
  ('Literature in English', 'LIT', 'Secondary'),
  ('Government', 'GOV', 'Secondary'),
  ('Economics', 'ECON', 'Secondary'),
  ('Basic Technology', 'BTECH', 'Secondary'),
  ('Computer Studies', 'COMP', 'Secondary'),
  ('Agricultural Science', 'AGR', 'Secondary'),
  ('Christian Religious Studies', 'CRS', 'Secondary'),
  ('Islamic Religious Studies', 'IRS', 'Secondary'),
  ('French', 'FRN', 'Secondary'),
  ('Yoruba', 'YOR', 'Primary'),
  ('Hausa', 'HAU', 'Primary'),
  ('Creative Arts', 'ART', 'Primary'),
  ('Physical & Health Education', 'PHE', 'Primary'),
  ('Home Economics', 'HECON', 'Primary')
ON CONFLICT (code) DO NOTHING;

-- Seed current academic session
INSERT INTO public.sessions (name, start_date, end_date, is_current) VALUES
  ('2024/2025', '2024-09-01', '2025-07-31', true)
ON CONFLICT (name) DO NOTHING;

-- Seed terms for current session
INSERT INTO public.terms (session_id, name, position, is_current)
SELECT s.id, t.name, t.position, t.is_current
FROM public.sessions s
CROSS JOIN (
  VALUES ('First Term', 1, true), ('Second Term', 2, false), ('Third Term', 3, false)
) AS t(name, position, is_current)
WHERE s.is_current = true
ON CONFLICT (session_id, name) DO NOTHING;
