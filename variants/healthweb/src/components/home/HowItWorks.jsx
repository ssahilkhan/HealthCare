import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, Award } from 'lucide-react';

const steps = [
  { id: 1, icon: <Search className="h-10 w-10 text-primary" />, title: 'Discover Resources', description: 'Use our powerful search or browse categories to find exactly what you need.' },
  { id: 2, icon: <BookOpen className="h-10 w-10 text-green-500" />, title: 'Learn at Your Pace', description: 'Engage with video tutorials, e-books, and interactive quizzes designed for all learning styles.' },
  { id: 3, icon: <Users className="h-10 w-10 text-purple-500" />, title: 'Join the Community', description: 'Connect with fellow learners and educators for support, discussion, and collaboration.' },
  { id: 4, icon: <Award className="h-10 w-10 text-red-500" />, title: 'Track Your Progress', description: 'Monitor your learning journey and celebrate your achievements as you grow.' },
];

const HowItWorks = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">How EduPortal Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">{step.title}</h3>
              <p className="text-gray-600 text-sm font-inter">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;