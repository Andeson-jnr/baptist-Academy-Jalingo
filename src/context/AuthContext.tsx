import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
export const MOCK_USERS: Record<UserRole, User> = {
  SUPER_ADMIN: { id: '1', name: 'Super Admin', email: 'admin@batist.edu.ng', role: 'SUPER_ADMIN' },
  PRINCIPAL: { id: '2', name: 'Dr. John Doe', email: 'principal@batist.edu.ng', role: 'PRINCIPAL' },
  VICE_PRINCIPAL_ACADEMIC: { id: '3', name: 'Mrs. Jane Smith', email: 'vp.academic@batist.edu.ng', role: 'VICE_PRINCIPAL_ACADEMIC' },
  EXAM_OFFICER: { id: '4', name: 'Mr. James Brown', email: 'exams@batist.edu.ng', role: 'EXAM_OFFICER' },
  TEACHER: { id: '5', name: 'Mr. Samuel Okafor', email: 'samuel@batist.edu.ng', role: 'TEACHER', classId: 'JSS1' },
  FORM_MASTER: { id: '6', name: 'Ms. Alice Johnson', email: 'alice@batist.edu.ng', role: 'FORM_MASTER', classId: 'SSS3' },
  STUDENT: { id: '7', name: 'Blessing Emmanuel', email: 'student@batist.edu.ng', role: 'STUDENT', classId: 'JSS1', studentId: 'BA/2023/001' },
  PARENT: { id: '8', name: 'Mr. Emmanuel Okon', email: 'parent@gmail.com', role: 'PARENT', studentId: 'BA/2023/001' },
  APPLICANT: { id: '9', name: 'New Applicant', email: 'applicant@gmail.com', role: 'APPLICANT' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('batist_user');
    if (savedUser) {
      setState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (role: UserRole) => {
    const user = MOCK_USERS[role];
    localStorage.setItem('batist_user', JSON.stringify(user));
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('batist_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
