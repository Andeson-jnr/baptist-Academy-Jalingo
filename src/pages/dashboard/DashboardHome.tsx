import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { TopBar } from '../../components/layout/TopBar';
import { AdminDashboard } from './AdminDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';
import { AdmissionsModule } from './AdmissionsModule';
import { ResultsModule } from './ResultsModule';
import { FeesModule } from './FeesModule';
import { CBTModule } from './CBTModule';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const renderDashboardHome = () => {
    if (!user) return null;
    switch (user.role) {
      case 'SUPER_ADMIN':
      case 'PRINCIPAL':
      case 'VICE_PRINCIPAL_ACADEMIC':
      case 'EXAM_OFFICER':
        return <AdminDashboard role={user.role} />;
      case 'TEACHER':
      case 'FORM_MASTER':
        return <TeacherDashboard role={user.role} />;
      case 'STUDENT':
        return <StudentDashboard />;
      case 'PARENT':
        return <div className="p-8">Parent Dashboard - Monitoring child's progress.</div>;
      default:
        return <div className="p-8">Unauthorized</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={renderDashboardHome()} />
            <Route path="admissions" element={<AdmissionsModule />} />
            <Route path="results" element={<ResultsModule />} />
            <Route path="fees" element={<FeesModule />} />
            <Route path="cbt" element={<CBTModule />} />
            <Route path="students" element={<div className="p-8">Students Management Module - CRUD</div>} />
            <Route path="staff" element={<div className="p-8">Staff Management Module - CRUD</div>} />
            <Route path="classes" element={<div className="p-8">Classes & Subjects Module</div>} />
            <Route path="attendance" element={<div className="p-8">Attendance Module</div>} />
            <Route path="timetable" element={<div className="p-8">Timetable Module</div>} />
            <Route path="library" element={<div className="p-8">Library Catalog Module</div>} />
            <Route path="settings" element={<div className="p-8">Portal Settings</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
