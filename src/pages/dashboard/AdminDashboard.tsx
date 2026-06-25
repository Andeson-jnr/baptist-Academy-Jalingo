import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, UserPlus, FileText, Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const AdminDashboard: React.FC<{ role: string }> = ({ role }) => {
  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, trend: '+4%', color: 'blue' },
    { label: 'Staff Count', value: '86', icon: UserPlus, trend: '+2%', color: 'green' },
    { label: 'Pending Apps', value: '24', icon: FileText, trend: '-12%', color: 'orange' },
    { label: 'Fees Collected', value: '₦4.2M', icon: Wallet, trend: '+8%', color: 'purple' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Welcome back, {role.replace('_', ' ')}. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                  stat.color === 'green' ? "bg-green-50 text-green-600" :
                  stat.color === 'orange' ? "bg-orange-50 text-orange-600" :
                  "bg-purple-50 text-purple-600"
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-bold",
                  stat.trend.startsWith('+') ? "text-green-600" : "text-destructive"
                )}>
                  {stat.trend}
                  {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Admission Applications</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Adamawa Aisha', class: 'SSS 1', date: '2 hours ago', status: 'Pending' },
                { name: 'Okon Christopher', class: 'JSS 2', date: '5 hours ago', status: 'In Review' },
                { name: 'Ibrahim Musa', class: 'Pry 4', date: 'Yesterday', status: 'Pending' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{app.name}</h4>
                      <p className="text-xs text-slate-500">Applying for {app.class} • {app.date}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    app.status === 'Pending' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12" variant="outline">
              <UserPlus className="w-4 h-4 mr-3 text-primary" />
              Register New Student
            </Button>
            <Button className="w-full justify-start h-12" variant="outline">
              <TrendingUp className="w-4 h-4 mr-3 text-green-500" />
              Generate Term Report
            </Button>
            <Button className="w-full justify-start h-12" variant="outline">
              <Wallet className="w-4 h-4 mr-3 text-purple-500" />
              Manage Fee Schedule
            </Button>
            <Button className="w-full justify-start h-12" variant="outline">
              <Settings className="w-4 h-4 mr-3 text-slate-400" />
              System Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { cn } from '../../lib/utils';
import { Settings } from 'lucide-react';
