import React from 'react';
import { AdmissionsModule } from './dashboard/AdmissionsModule';

const PublicAdmissions: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-20">
      <section className="bg-slate-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Batist Academy</h1>
          <p className="text-xl text-slate-300">
            Start your journey with us today. Our admission process is simple and transparent.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <AdmissionsModule />
      </div>

      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Admission Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Apply Online', desc: 'Fill out the application form above with required details.' },
            { step: '2', title: 'Entrance Exam', desc: 'Candidates will be invited for a brief evaluation.' },
            { step: '3', title: 'Confirmation', desc: 'Successful applicants receive an admission letter via email.' }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto">
                {item.step}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicAdmissions;
