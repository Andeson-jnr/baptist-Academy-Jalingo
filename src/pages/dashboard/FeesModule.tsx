import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CreditCard, Download, History, Wallet, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const FeesModule: React.FC = () => {
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      toast.success('Payment successful! Receipt generated.');
    }, 2000);
  };

  const fees = [
    { title: 'School Fees', amount: '₦120,000', status: 'Paid', date: 'Sept 05, 2023' },
    { title: 'PTA Levy', amount: '₦5,000', status: 'Paid', date: 'Sept 10, 2023' },
    { title: 'Development Fund', amount: '₦15,000', status: 'Pending', date: '-' },
    { title: 'Exam Fees', amount: '₦10,000', status: 'Pending', date: '-' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Fees & Payments</h1>
        <p className="text-slate-500">View invoices, payment history and settle outstanding balances.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Invoice History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fees.map((fee, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">{fee.title}</h4>
                    <p className="text-xs text-slate-500">Term: First Term 2023/2024</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{fee.amount}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{fee.date}</p>
                    </div>
                    <Badge variant={fee.status === 'Paid' ? 'default' : 'secondary'} className={fee.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                      {fee.status}
                    </Badge>
                    {fee.status === 'Paid' && <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm font-medium uppercase tracking-widest">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                <Wallet className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold">₦25,000</div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Selected Payment Method</p>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-sm">Paystack / Flutterwave</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <Button 
              className="w-full h-12 text-lg font-bold" 
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying ? 'Processing...' : 'Pay Now'}
            </Button>
          </CardContent>
          <CardFooter className="border-t border-slate-800 text-[10px] text-slate-500 pt-4">
            Secure payment powered by encrypted gateway.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
