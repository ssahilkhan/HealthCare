import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Code, BookOpen as EnglishIcon, Brain, Lightbulb } from 'lucide-react'; // Renamed BookOpen to EnglishIcon for clarity

const categories = [
  { name: 'Mathematics', icon: <Lightbulb className="h-10 w-10 text-primary" />, description: 'Explore algebra, calculus, geometry and more.', link: '/courses/math' },
  { name: 'Science', icon: <Atom className="h-10 w-10 text-green-500" />, description: 'Dive into physics, chemistry, biology.', link: '/courses/science' },
  { name: 'English', icon: <EnglishIcon className="h-10 w-10 text-purple-500" />, description: 'Improve grammar, literature, writing skills.', link: '/courses/english' },
  { name: 'Coding', icon: <Code className="h-10 w-10 text-red-500" />, description: 'Learn Python, JavaScript, web development.', link: '/courses/coding' },
  { name: 'Critical Thinking', icon: <Brain className="h-10 w-10 text-yellow-500" />, description: 'Enhance problem-solving and analytical skills.', link: '/courses/critical-thinking' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const CategoryCards = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 font-poppins">Explore by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.custom
              key={category.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              className="w-full"
              elementType={Link}
              to={category.link}
            >
              <Card className="h-full flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 card-hover-pop cursor-pointer bg-white">
                <CardHeader className="pt-8">
                  {category.icon}
                  <CardTitle className="mt-4 text-xl font-poppins">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 font-inter">{category.description}</p>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;