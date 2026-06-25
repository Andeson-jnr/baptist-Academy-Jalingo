import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { LogIn, Shield, Users, User, GraduationCap, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: UserRole) => {
    login(role);
    toast.success(`Logged in as ${role.replace('_', ' ')}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <Link to="/">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-logo-6f638952-1782348412994.webp" 
            alt="Logo" 
            className="mx-auto h-20 w-auto mb-6"
          />
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900">School Portal Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Access your personalized dashboard and school resources.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <Card className="border-none shadow-xl">
          <CardContent className="pt-6">
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="admin">Administration</TabsTrigger>
                <TabsTrigger value="staff">Staff/Teacher</TabsTrigger>
                <TabsTrigger value="student">Student/Parent</TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('SUPER_ADMIN')}
                  >
                    <Shield className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Super Admin</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('PRINCIPAL')}
                  >
                    <UserCheck className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Principal</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('VICE_PRINCIPAL_ACADEMIC')}
                  >
                    <UserCheck className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Vice Principal</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('EXAM_OFFICER')}
                  >
                    <UserCheck className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Exam Officer</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="staff" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('TEACHER')}
                  >
                    <Users className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Subject Teacher</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('FORM_MASTER')}
                  >
                    <User className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Form Master</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="student" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('STUDENT')}
                  >
                    <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Student Login</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-200 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => handleLogin('PARENT')}
                  >
                    <Users className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    <span>Parent Portal</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or use credentials</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="admin@batist.edu.ng" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full h-11" onClick={() => handleLogin('SUPER_ADMIN')}>
                Login to Portal
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-50 bg-slate-50/50 rounded-b-xl py-4">
            <p className="text-xs text-slate-500">
              New Applicant? <Link to="/admissions" className="text-primary font-semibold">Apply Online</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

import { Link as RouterLink } from 'react-router-dom';
const Link = ({ children, to, className, ...props }: any) => (
  <RouterLink to={to} className={className} {...props}>{children}</RouterLink>
);

export default Login;
