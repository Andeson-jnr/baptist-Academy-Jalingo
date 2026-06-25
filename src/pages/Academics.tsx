import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Book, Atom, Music, Monitor, Languages } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const Academics: React.FC = () => {
  const departments = [
    { name: 'Sciences', icon: <Atom className="w-6 h-6" />, desc: 'Biology, Chemistry, Physics, and Further Mathematics with fully equipped laboratories.' },
    { name: 'Humanities', icon: <Languages className="w-6 h-6" />, desc: 'Literature in English, History, and Government focusing on critical analysis.' },
    { name: 'Technology', icon: <Monitor className="w-6 h-6" />, desc: 'Modern computing, coding, and technical drawing in our state-of-the-art lab.' },
    { name: 'Arts & Music', icon: <Music className="w-6 h-6" />, desc: 'Fostering creativity through visual arts and musical training.' }
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Academic Excellence
          </motion.h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            A curriculum designed to challenge, inspire, and prepare students for global success.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Foundation</span>
              <h2 className="text-4xl font-bold mt-4 mb-6 text-slate-900">Nursery & Primary Section</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                In our primary section, we focus on building strong foundations in literacy, numeracy, and social skills. Our play-based nursery curriculum transitions smoothly into a rigorous but supportive primary education.
              </p>
              <ul className="space-y-4">
                {['Phonics and Reading Mastery', 'Early Mathematical Thinking', 'Creative Expression', 'Physical Development'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp" 
                alt="Primary" 
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Advanced Learning</span>
              <h2 className="text-4xl font-bold mt-4 mb-6 text-slate-900">Secondary Section</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our secondary section offers a comprehensive JSS and SSS curriculum aligned with WAEC and NECO standards. We provide specialized pathways in Sciences, Humanities, and Commercial studies.
              </p>
              <ul className="space-y-4">
                {['WAEC/NECO Preparation', 'Leadership Training', 'Career Guidance', 'Competitive Sports'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative lg:order-1">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/sports-activity-68b5cf1d-1782348413419.webp" 
                alt="Secondary" 
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Departments</h2>
            <p className="text-slate-500">Specialized learning environments for every talent.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{dept.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{dept.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
