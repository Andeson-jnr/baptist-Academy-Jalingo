import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2, Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-logo-6f638952-1782348412994.webp" 
                alt="Logo" 
                className="h-10 w-10 brightness-0 invert"
              />
              <span className="font-bold text-white text-xl">BATIST ACADEMY</span>
            </div>
            <p className="text-sm leading-relaxed">
              Excellence in Education. Nurturing the next generation of leaders through quality academic and moral instruction in Jalingo, Taraba State.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Video className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academics</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">School Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Portal */}
          <div>
            <h4 className="text-white font-bold mb-6">School Portal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Staff Login</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Parent Portal</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Online Application</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Check Result</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Opposite Federal Secretariat, Jalingo, Taraba State.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@batist.edu.ng</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Batist Academy, Jalingo. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
