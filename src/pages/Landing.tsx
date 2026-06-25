import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, BookOpen, Users, Award, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Quality Academics",
      description: "Comprehensive curriculum covering both Primary and Secondary sections with a focus on holistic development."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Expert Faculty",
      description: "Highly qualified and dedicated educators committed to nurturing every student's unique potential."
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Moral Excellence",
      description: "We instill strong ethical values and discipline, preparing students for responsible citizenship."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/classroom-scene-2286cb02-1782348412695.webp" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-semibold mb-6">
              Empowering Minds, Shaping Futures
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
              Welcome to <span className="text-primary">Batist Academy</span> Jalingo
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              Join a community where academic excellence meets moral integrity. We provide a world-class learning environment for Nursery, Primary, and Secondary education.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admissions">
                <Button size="lg" className="h-14 px-8 text-lg">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Batist Academy?</h2>
            <p className="text-lg text-slate-600">
              We provide a supportive and challenging environment that encourages students to explore their interests and develop their talents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/About Section */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9793190a-5377-4d66-b00c-313fef2c5a4c/school-building-dd4ee52e-1782348414490.webp" 
                alt="About" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl z-0" />
            </motion.div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Building a Legacy of Excellence Since 2010</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                At Batist Academy, we believe every child has the potential to achieve greatness. Our holistic approach to education combines rigorous academics with character-building activities.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Serene Learning Environment', 'Modern Computer Laboratories', 'State-of-the-art Library', 'Qualified and Motivated Staff'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-800">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                  <div className="text-sm text-slate-500">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-slate-500">Teachers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-slate-500">WAEC Pass</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">14+</div>
                  <div className="text-sm text-slate-500">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
              <p className="text-xl text-primary-foreground/80 mb-12">
                Join Batist Academy today and give your child the best foundation for a successful future.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/admissions">
                  <Button size="lg" variant="secondary" className="h-14 px-10 text-lg">
                    Apply Online
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white text-white hover:bg-white hover:text-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
