import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BookOpen, ClipboardCheck, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const TeacherDashboard: React.FC<{ role: string }> = ({ role }) => {
  const classes = [
    { name: 'JSS 1A', subject: 'Mathematics', students: 42, status: 'In Progress' },
    { name: 'JSS 1B', subject: 'Mathematics', students: 40, status: 'Pending Approval' },
    { name: 'SSS 3C', subject: 'Further Maths', students: 15, status: 'Submitted' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teacher Workspace</h1>
          <p className="text-slate-500">Manage your classes, subjects, and student scores.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            <ClipboardCheck className="w-4 h-4 mr-2" /> Mark Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assigned Classes */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            My Assigned Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:ring-1 hover:ring-primary/20 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{cls.name}</h3>
                      <p className="text-sm text-primary font-medium">{cls.subject}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-bold uppercase",
                      cls.status === 'Submitted' ? "bg-green-100 text-green-600" : 
                      cls.status === 'Pending Approval' ? "bg-orange-100 text-orange-600" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {cls.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-500">{cls.students} Students</span>
                    <Button size="sm" variant="ghost" className="h-8 text-primary">Enter Scores</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Result Submission Progress */}
        <div className="space-y-6">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Submission Status
          </h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-6">
              {[
                { step: 'Score Entry', status: 'completed' },
                { step: 'Computation', status: 'completed' },
                { step: 'Form Master Review', status: 'pending' },
                { step: 'Admin Approval', status: 'waiting' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    step.status === 'completed' ? "bg-green-50 border-green-200 text-green-600" :
                    step.status === 'pending' ? "bg-orange-50 border-orange-200 text-orange-600" :
                    "bg-slate-50 border-slate-100 text-slate-400"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">{step.step}</h4>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">{step.status}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../../lib/utils';
