import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="text-center py-12 md:py-20 bg-gradient-to-r from-blue-500 via-primary to-green-500 rounded-lg shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
          Empowering Students with Free Education
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-inter">
          Access a world of knowledge with our comprehensive collection of tutorials, e-books, video lectures, quizzes, and a supportive community. All for free, forever.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
            <Link to="/courses">
              Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
        <div className="mt-10">
          <img  
            alt="Diverse students learning together" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            style={{ aspectRatio: '16/9', objectFit: 'cover' }}
           src="https://images.unsplash.com/photo-1562212424-f9452f6d6e8f" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;