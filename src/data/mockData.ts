export interface Student {
  id: string;
  name: string;
  class: string;
  section: 'Nursery/Primary' | 'Secondary';
  gender: string;
  dateOfBirth: string;
  admissionNo: string;
  status: 'Active' | 'Withdrawn' | 'Graduated';
}

export interface Application {
  id: string;
  surname: string;
  firstName: string;
  otherNames?: string;
  gender: string;
  dob: string;
  state: string;
  lga: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  classApplyingFor: string;
  section: string;
  passportUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  applicationNo: string;
  createdAt: string;
}

export interface ScoreEntry {
  subjectId: string;
  subjectName: string;
  studentId: string;
  studentName: string;
  test1: number;
  test2: number;
  assignment: number;
  exam: number;
  total?: number;
  grade?: string;
  position?: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Published';
}

export const CLASSES = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
export const SECTIONS = ['Nursery/Primary', 'Secondary'];
export const SUBJECTS = ['Mathematics', 'English Language', 'Basic Science', 'Social Studies', 'Civic Education', 'Biology', 'Chemistry', 'Physics', 'Further Mathematics'];

export const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Blessing Emmanuel', class: 'JSS 1', section: 'Secondary', gender: 'Female', dateOfBirth: '2010-05-15', admissionNo: 'BA/2023/001', status: 'Active' },
  { id: '2', name: 'John Okon', class: 'SSS 3', section: 'Secondary', gender: 'Male', dateOfBirth: '2006-08-20', admissionNo: 'BA/2018/045', status: 'Active' },
];

export const INITIAL_APPLICATIONS: Application[] = [
  { 
    id: 'app_1', 
    surname: 'Adamawa', 
    firstName: 'Aisha', 
    gender: 'Female', 
    dob: '2012-10-01', 
    state: 'Taraba', 
    lga: 'Jalingo', 
    address: 'No 45 Federal Housing', 
    parentName: 'Mr. Adamawa', 
    parentPhone: '08030001112', 
    parentEmail: 'aisha.p@gmail.com', 
    classApplyingFor: 'SSS 1', 
    section: 'Secondary', 
    status: 'Pending', 
    applicationNo: 'APP/2024/0001', 
    createdAt: new Date().toISOString() 
  }
];
