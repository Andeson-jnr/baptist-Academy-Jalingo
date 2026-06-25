import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="pb-20">
      <section className="bg-slate-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-300">Have questions? We're here to help.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Get in Touch</h2>
                <p className="text-lg text-slate-600">
                  Whether you're a prospective parent, a student, or a member of the community, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-slate-500">Opposite Federal Secretariat, Jalingo, Taraba State, Nigeria.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-slate-500">+234 800 123 4567, +234 900 765 4321</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                    <p className="text-slate-500">info@batist.edu.ng, admissions@batist.edu.ng</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-primary text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xl mb-2">Live Chat</h4>
                  <p className="text-primary-foreground/80 text-sm">Available Mon-Fri, 8am-4pm</p>
                </div>
                <Button variant="secondary" className="rounded-full h-12 px-6">
                  <MessageCircle className="w-5 h-5 mr-2" /> Chat Now
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="p-10 rounded-3xl bg-white border border-slate-100 shadow-xl">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input required type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input required placeholder="General Inquiry" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea required placeholder="How can we help you?" className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full h-12 text-lg">
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
