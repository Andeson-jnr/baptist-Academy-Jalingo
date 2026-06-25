import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  BookOpen, 
  FileText, 
  Calendar, 
  Library, 
  CreditCard, 
  Settings,
  LogOut,
  ChevronRight,
  ClipboardCheck,
  GraduationCap
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuGroups = [
    {
      label: 'Main',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['ANY'] },
        { name: 'Admissions', icon: UserSquare2, path: '/dashboard/admissions', roles: ['SUPER_ADMIN', 'PRINCIPAL'] },
        { name: 'Students', icon: GraduationCap, path: '/dashboard/students', roles: ['SUPER_ADMIN', 'PRINCIPAL', 'FORM_MASTER'] },
        { name: 'Staff', icon: Users, path: '/dashboard/staff', roles: ['SUPER_ADMIN'] },
      ]
    },
    {
      label: 'Academic',
      items: [
        { name: 'Classes & Subjects', icon: BookOpen, path: '/dashboard/classes', roles: ['SUPER_ADMIN', 'PRINCIPAL'] },
        { name: 'Results', icon: FileText, path: '/dashboard/results', roles: ['ANY'] },
        { name: 'Attendance', icon: ClipboardCheck, path: '/dashboard/attendance', roles: ['TEACHER', 'FORM_MASTER', 'SUPER_ADMIN'] },
        { name: 'Timetable', icon: Calendar, path: '/dashboard/timetable', roles: ['ANY'] },
        { name: 'CBT / Exams', icon: FileText, path: '/dashboard/cbt', roles: ['STUDENT', 'TEACHER', 'SUPER_ADMIN'] },
      ]
    },
    {
      label: 'Others',
      items: [
        { name: 'Library', icon: Library, path: '/dashboard/library', roles: ['ANY'] },
        { name: 'Fees & Payments', icon: CreditCard, path: '/dashboard/fees', roles: ['SUPER_ADMIN', 'PRINCIPAL', 'STUDENT', 'PARENT'] },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings', roles: ['SUPER_ADMIN'] },
      ]
    }
  ];

  const filteredGroups = menuGroups.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.roles.includes('ANY') || (user && item.roles.includes(user.role))
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="w-64 bg-slate-900 h-full flex flex-col text-slate-300">
      <div className="p-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-logo-6f638952-1782348412994.webp" 
            alt="Logo" 
            className="h-8 w-8 brightness-0 invert"
          />
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">BATIST PORTAL</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Academy</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {filteredGroups.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {group.label}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200 group",
                      isActive 
                        ? "bg-primary text-white font-medium" 
                        : "hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-primary")} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
