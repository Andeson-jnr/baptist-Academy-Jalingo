import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { CLASSES, SUBJECTS, ScoreEntry, INITIAL_STUDENTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { FileSpreadsheet, Save, Send, CheckCircle2, XCircle, Printer } from 'lucide-react';

export const ResultsModule: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('JSS 1');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Initialize scores for the selected class/subject
  useEffect(() => {
    const saved = localStorage.getItem(`scores_${selectedClass}_${selectedSubject}`);
    if (saved) {
      setScores(JSON.parse(saved));
    } else {
      const initial = INITIAL_STUDENTS.filter(s => s.class === selectedClass).map(s => ({
        subjectId: selectedSubject,
        subjectName: selectedSubject,
        studentId: s.id,
        studentName: s.name,
        test1: 0,
        test2: 0,
        assignment: 0,
        exam: 0,
        status: 'Draft' as const,
      }));
      setScores(initial);
    }
  }, [selectedClass, selectedSubject]);

  const computeGrade = (total: number) => {
    if (total >= 75) return 'A1';
    if (total >= 70) return 'B2';
    if (total >= 65) return 'B3';
    if (total >= 60) return 'C4';
    if (total >= 55) return 'C5';
    if (total >= 50) return 'C6';
    if (total >= 45) return 'D7';
    if (total >= 40) return 'E8';
    return 'F9';
  };

  const handleScoreChange = (studentId: string, field: keyof ScoreEntry, value: string) => {
    const numValue = Math.min(Number(value) || 0, field === 'exam' ? 60 : field === 'assignment' ? 20 : 10);
    const updated = scores.map(s => {
      if (s.studentId === studentId) {
        const newScore = { ...s, [field]: numValue };
        const total = (newScore.test1 || 0) + (newScore.test2 || 0) + (newScore.assignment || 0) + (newScore.exam || 0);
        return { ...newScore, total, grade: computeGrade(total) };
      }
      return s;
    });
    setScores(updated);
  };

  const saveDraft = () => {
    localStorage.setItem(`scores_${selectedClass}_${selectedSubject}`, JSON.stringify(scores));
    toast.success('Draft saved successfully');
  };

  const submitToFormMaster = () => {
    const updated = scores.map(s => ({ ...s, status: 'Submitted' as const }));
    setScores(updated);
    localStorage.setItem(`scores_${selectedClass}_${selectedSubject}`, JSON.stringify(updated));
    toast.success('Scores submitted to Form Master');
  };

  const approveScores = () => {
    const updated = scores.map(s => ({ ...s, status: 'Approved' as const }));
    setScores(updated);
    localStorage.setItem(`scores_${selectedClass}_${selectedSubject}`, JSON.stringify(updated));
    toast.success('Scores approved by Form Master');
  };

  const publishResults = () => {
    const updated = scores.map(s => ({ ...s, status: 'Published' as const }));
    setScores(updated);
    localStorage.setItem(`scores_${selectedClass}_${selectedSubject}`, JSON.stringify(updated));
    toast.success('Results published! Students can now view them.');
  };

  const isEditable = (status: string) => {
    if (status === 'Published') return false;
    if (user?.role === 'TEACHER' && status === 'Draft') return true;
    return false;
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Result Management</h1>
          <p className="text-slate-500">Record, review, and publish student academic results.</p>
        </div>
        <div className="flex gap-3">
          {user?.role === 'TEACHER' && scores[0]?.status === 'Draft' && (
            <>
              <Button variant="outline" onClick={saveDraft}><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
              <Button onClick={submitToFormMaster}><Send className="w-4 h-4 mr-2" /> Submit to Form Master</Button>
            </>
          )}
          {user?.role === 'FORM_MASTER' && scores[0]?.status === 'Submitted' && (
            <Button className="bg-green-600 hover:bg-green-700" onClick={approveScores}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Approve Results
            </Button>
          )}
          {(user?.role === 'SUPER_ADMIN' || user?.role === 'EXAM_OFFICER') && scores[0]?.status === 'Approved' && (
            <Button className="bg-primary hover:bg-primary/90" onClick={publishResults}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Publish Results
            </Button>
          )}
          <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Print Sheet</Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex flex-wrap gap-4">
            <div className="w-48">
              <Label className="text-[10px] uppercase font-bold text-slate-500">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label className="text-[10px] uppercase font-bold text-slate-500">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto self-end">
              <div className={cn(
                "px-4 py-2 rounded-lg border font-bold text-xs uppercase tracking-widest flex items-center gap-2",
                scores[0]?.status === 'Published' ? "bg-green-50 text-green-600 border-green-100" :
                scores[0]?.status === 'Approved' ? "bg-blue-50 text-blue-600 border-blue-100" :
                scores[0]?.status === 'Submitted' ? "bg-orange-50 text-orange-600 border-orange-100" :
                "bg-slate-50 text-slate-600 border-slate-100"
              )}>
                Status: {scores[0]?.status || 'Draft'}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/30">
                <TableHead className="w-[250px]">Student Name</TableHead>
                <TableHead className="text-center">Test 1 (10)</TableHead>
                <TableHead className="text-center">Test 2 (10)</TableHead>
                <TableHead className="text-center">Assign (20)</TableHead>
                <TableHead className="text-center">Exam (60)</TableHead>
                <TableHead className="text-center">Total (100)</TableHead>
                <TableHead className="text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score) => (
                <TableRow key={score.studentId}>
                  <TableCell className="font-medium text-slate-900">{score.studentName}</TableCell>
                  <TableCell className="text-center">
                    <Input 
                      type="number" 
                      className="w-16 mx-auto text-center h-8" 
                      value={score.test1} 
                      disabled={!isEditable(score.status)}
                      onChange={e => handleScoreChange(score.studentId, 'test1', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input 
                      type="number" 
                      className="w-16 mx-auto text-center h-8" 
                      value={score.test2} 
                      disabled={!isEditable(score.status)}
                      onChange={e => handleScoreChange(score.studentId, 'test2', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input 
                      type="number" 
                      className="w-16 mx-auto text-center h-8" 
                      value={score.assignment} 
                      disabled={!isEditable(score.status)}
                      onChange={e => handleScoreChange(score.studentId, 'assignment', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input 
                      type="number" 
                      className="w-20 mx-auto text-center h-8 font-bold" 
                      value={score.exam} 
                      disabled={!isEditable(score.status)}
                      onChange={e => handleScoreChange(score.studentId, 'exam', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-bold text-slate-900">
                    {score.total || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "inline-flex items-center justify-center w-8 h-8 rounded font-bold text-[10px]",
                      (score.total || 0) >= 50 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {score.grade || '-'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {scores.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No students found</h3>
          <p className="text-slate-500">Please check your class and subject selection.</p>
        </div>
      )}
    </div>
  );
};

import { cn } from '../../lib/utils';
import { Label } from '../../components/ui/label';
