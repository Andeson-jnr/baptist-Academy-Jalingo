import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const images = [
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp', title: 'Classroom Learning', category: 'Academic' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/sports-activity-68b5cf1d-1782348413419.webp', title: 'Inter-house Sports', category: 'Sports' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-building-dd4ee52e-1782348414490.webp', title: 'School Campus', category: 'Facilities' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/principal-portrait-5b71c33d-1782348413544.webp', title: 'Graduation Ceremony', category: 'Events' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp', title: 'Library Session', category: 'Facilities' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/sports-activity-68b5cf1d-1782348413419.webp', title: 'Football Match', category: 'Sports' },
  ];

  return (
    <div className="pb-20">
      <section className="bg-slate-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Gallery</h1>
          <p className="text-xl text-slate-300">Capturing moments of learning, growth, and joy.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{img.category}</span>
                  <h3 className="text-xl font-bold">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
