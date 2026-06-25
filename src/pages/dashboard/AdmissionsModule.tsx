import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { CLASSES, SECTIONS, INITIAL_APPLICATIONS, Application } from '../../data/mockData';
import { toast } from 'sonner';
import { UserPlus, Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdmissionsModule: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [view, setView] = useState<'list' | 'form'>('list');

  useEffect(() => {
    const saved = localStorage.getItem('batist_applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    } else {
      setApplications(INITIAL_APPLICATIONS);
    }
  }, []);

  const saveApplications = (newApps: Application[]) => {
    setApplications(newApps);
    localStorage.setItem('batist_applications', JSON.stringify(newApps));
  };

  const [formData, setFormData] = useState<Partial<Application>>({
    surname: '',
    firstName: '',
    gender: 'Male',
    classApplyingFor: 'JSS 1',
    section: 'Secondary',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: Application = {
      ...(formData as Application),
      id: `app_${Date.now()}`,
      applicationNo: `APP/2024/${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    saveApplications([newApp, ...applications]);
    toast.success('Application submitted successfully! Application No: ' + newApp.applicationNo);
    setView('list');
  };

  const handleStatusChange = (id: string, status: 'Approved' | 'Rejected') => {
    const updated = applications.map(app => app.id === id ? { ...app, status } : app);
    saveApplications(updated);
    toast.info(`Application ${status.toLowerCase()}`);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admission Module</h1>
          <p className="text-slate-500">Manage online applications and admissions.</p>
        </div>
        <Button onClick={() => setView(view === 'list' ? 'form' : 'list')}>
          {view === 'list' ? <><UserPlus className="w-4 h-4 mr-2" /> New Application</> : 'Back to List'}
        </Button>
      </div>

      {view === 'list' ? (
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Applications</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search applicants..." className="pl-10 h-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-bold">{app.applicationNo}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{app.surname} {app.firstName}</span>
                        <span className="text-xs text-slate-500">{app.parentEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>{app.classApplyingFor}</TableCell>
                    <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        app.status === 'Approved' ? "bg-green-100 text-green-600" :
                        app.status === 'Rejected' ? "bg-destructive/10 text-destructive" :
                        "bg-orange-100 text-orange-600"
                      )}>
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                      {(user?.role === 'SUPER_ADMIN' || user?.role === 'PRINCIPAL') && app.status === 'Pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleStatusChange(app.id, 'Approved')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/5"
                            onClick={() => handleStatusChange(app.id, 'Rejected')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Online Admission Application</CardTitle>
            <CardDescription>Please fill in the candidate's details accurately.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Surname</Label>
                  <Input required value={formData.surname} onChange={e => setFormData({...formData, surname: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Other Names</Label>
                  <Input value={formData.otherNames} onChange={e => setFormData({...formData, otherNames: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select onValueChange={v => setFormData({...formData, gender: v})} defaultValue={formData.gender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" required onChange={e => setFormData({...formData, dob: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Select onValueChange={v => setFormData({...formData, section: v})} defaultValue={formData.section}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Class Applying For</Label>
                  <Select onValueChange={v => setFormData({...formData, classApplyingFor: v})} defaultValue={formData.classApplyingFor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label>Parent/Guardian Name</Label>
                  <Input required onChange={e => setFormData({...formData, parentName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Parent Phone</Label>
                  <Input required type="tel" onChange={e => setFormData({...formData, parentPhone: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Parent Email</Label>
                  <Input required type="email" onChange={e => setFormData({...formData, parentEmail: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Home Address</Label>
                  <Input required onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => setView('list')}>Cancel</Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

import { cn } from '../../lib/utils';
