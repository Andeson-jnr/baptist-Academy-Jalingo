import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Progress } from '../../components/ui/progress';
import { Timer, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const CBTModule: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "What is the capital of Nigeria?",
      options: ["Lagos", "Kano", "Abuja", "Ibadan"],
      a: "Abuja"
    },
    {
      q: "Which organ in the human body filters blood?",
      options: ["Heart", "Lungs", "Kidneys", "Liver"],
      a: "Kidneys"
    },
    {
      q: "Solve for x: 2x + 10 = 20",
      options: ["5", "10", "15", "20"],
      a: "5"
    }
  ];

  useEffect(() => {
    if (started && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [started, timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success('Exam submitted successfully!');
  };

  if (!started) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full border-none shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <Timer className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Mathematics Quiz</h2>
            <p className="text-slate-500 mt-2">First Term Mock Examination</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-medium">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400">Questions</p>
              <p className="text-xl">{questions.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400">Time Limit</p>
              <p className="text-xl">10 Mins</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-700 rounded-xl text-xs text-left">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Ensure you have a stable internet connection. The timer starts as soon as you begin.</p>
          </div>
          <Button className="w-full h-12 text-lg" onClick={() => setStarted(true)}>Start Examination</Button>
        </Card>
      </div>
    );
  }

  if (submitted) {
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.a ? 1 : 0), 0);
    return (
      <div className="p-8 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full border-none shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Exam Completed</h2>
            <p className="text-slate-500 mt-2">Your results have been recorded.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-2xl">
            <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-2">Final Score</p>
            <div className="text-6xl font-black text-slate-900">
              {score}<span className="text-2xl text-slate-300">/{questions.length}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setStarted(false)}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-sm py-4 z-10">
        <div>
          <h2 className="text-xl font-bold">Mathematics Quiz</h2>
          <p className="text-xs text-slate-500">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className={cn(
          "px-4 py-2 rounded-lg font-mono font-bold flex items-center gap-2",
          timeLeft < 60 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-slate-900 text-white"
        )}>
          <Timer className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl leading-relaxed">
            {questions[currentQuestion].q}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentQuestion]} 
            onValueChange={v => setAnswers({...answers, [currentQuestion]: v})}
            className="space-y-4"
          >
            {questions[currentQuestion].options.map((opt, i) => (
              <div key={i} className={cn(
                "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                answers[currentQuestion] === opt ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"
              )} onClick={() => setAnswers({...answers, [currentQuestion]: opt})}>
                <RadioGroupItem value={opt} id={`q-${i}`} />
                <Label htmlFor={`q-${i}`} className="flex-1 cursor-pointer font-medium text-lg">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button 
            variant="ghost" 
            disabled={currentQuestion === 0} 
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            Previous
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>Finish & Submit</Button>
          ) : (
            <Button onClick={() => setCurrentQuestion(prev => prev + 1)}>Next Question</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

import { cn } from '../../lib/utils';
