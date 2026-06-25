import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Eye, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-building-dd4ee52e-1782348414490.webp" 
            alt="School" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            About Batist Academy
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A legacy of excellence, character building, and academic distinction in Jalingo.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-100"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To provide a nurturing and challenging learning environment that empowers students to achieve academic excellence, develop strong moral character, and become responsible leaders in a global society.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-100"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To be a leading center of educational excellence in Nigeria, recognized for producing well-rounded individuals who are academically competent, morally upright, and socially responsible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/principal-portrait-5b71c33d-1782348413544.webp" 
                alt="Principal" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">Our History & Values</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded in 2010, Batist Academy began with a simple goal: to provide quality education that doesn't just focus on grades, but on the whole child. Over the past decade, we have grown from a small neighborhood school into a premier institution with both Primary and Secondary sections.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Integrity & Honesty',
                  'Academic Rigor',
                  'Respect for Diversity',
                  'Community Service',
                  'Critical Thinking',
                  'Innovation in Learning'
                ].map((value, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-slate-500">The dedicated professionals guiding our academy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. John Doe', role: 'Principal', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/principal-portrait-5b71c33d-1782348413544.webp' },
              { name: 'Mrs. Jane Smith', role: 'VP Academic', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp' },
              { name: 'Mr. James Brown', role: 'Exam Officer', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/sports-activity-68b5cf1d-1782348413419.webp' },
              { name: 'Ms. Alice Johnson', role: 'Head of Primary', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-300 shadow-lg" />
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
