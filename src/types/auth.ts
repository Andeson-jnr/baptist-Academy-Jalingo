export type UserRole = 
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL_ACADEMIC'
  | 'EXAM_OFFICER'
  | 'TEACHER'
  | 'FORM_MASTER'
  | 'STUDENT'
  | 'PARENT'
  | 'APPLICANT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  classId?: string; // For teachers, form masters, students
  studentId?: string; // For parents/students
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
