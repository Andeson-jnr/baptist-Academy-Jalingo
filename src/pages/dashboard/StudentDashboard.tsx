import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { GraduationCap, Calendar, FileText, Bell, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Portal</h1>
          <p className="text-slate-500">Welcome, Blessing. Check your academic progress and announcements.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <FileText className="w-4 h-4 mr-2" /> Download Report Card
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-primary text-white overflow-hidden relative">
              <CardContent className="p-8 relative z-10">
                <GraduationCap className="w-12 h-12 mb-6 opacity-20 absolute -right-4 -top-4 scale-150 rotate-12" />
                <h3 className="text-lg font-medium opacity-80 mb-2">Current Class</h3>
                <p className="text-4xl font-bold">JSS 1 Alpha</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs opacity-60 uppercase font-bold tracking-widest">Term</span>
                    <span className="font-bold">First Term</span>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="flex flex-col">
                    <span className="text-xs opacity-60 uppercase font-bold tracking-widest">Attendance</span>
                    <span className="font-bold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden relative">
              <CardContent className="p-8 relative z-10">
                <CreditCard className="w-12 h-12 mb-6 opacity-20 absolute -right-4 -top-4 scale-150 rotate-12" />
                <h3 className="text-lg font-medium opacity-80 mb-2">Fees Status</h3>
                <p className="text-4xl font-bold">Paid</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs opacity-60 uppercase font-bold tracking-widest">Receipt No.</span>
                    <span className="font-bold">#BT-90210</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Timetable
            </h2>
            <div className="space-y-3">
              {[
                { time: '08:30 AM', subject: 'Mathematics', teacher: 'Mr. Samuel' },
                { time: '09:45 AM', subject: 'English Language', teacher: 'Mrs. Jane' },
                { time: '11:00 AM', subject: 'Basic Science', teacher: 'Mr. James' },
              ].map((period, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100">
                  <div className="w-20 text-xs font-bold text-primary">{period.time}</div>
                  <div className="h-8 w-px bg-slate-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{period.subject}</h4>
                    <p className="text-xs text-slate-500">{period.teacher}</p>
                  </div>
                  <Button size="sm" variant="ghost">Join Class</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications & Results */}
        <div className="space-y-8">
          <section>
            <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              Latest News
            </h2>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                {[
                  { title: 'Inter-house Sports Day', date: 'Oct 24, 2023', type: 'Event' },
                  { title: 'Mid-term Break Notice', date: 'Oct 15, 2023', type: 'Notice' },
                ].map((news, i) => (
                  <div key={i} className="pb-4 last:pb-0 border-b last:border-0 border-slate-50">
                    <span className="text-[10px] font-bold uppercase text-primary mb-1 block">{news.type}</span>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">{news.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{news.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              Quick Results
            </h2>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                {[
                  { subject: 'Math', score: '88/100', grade: 'A' },
                  { subject: 'English', score: '72/100', grade: 'B' },
                  { subject: 'Science', score: '91/100', grade: 'A+' },
                ].map((res, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{res.subject}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-slate-900">{res.score}</span>
                      <span className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold">{res.grade}</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline" size="sm">Full Report</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
