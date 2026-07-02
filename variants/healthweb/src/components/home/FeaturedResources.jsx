import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, FileText, HelpCircle, ArrowRight } from 'lucide-react';

const featured = [
  { type: 'Video', title: 'Introduction to Algebra', icon: <PlayCircle className="h-8 w-8 text-primary" />, link: '/video-tutorials/algebra-intro', image: 'Abstract representation of algebraic equations' },
  { type: 'E-book', title: 'The World of Physics', icon: <FileText className="h-8 w-8 text-green-500" />, link: '/ebooks/physics-world', image: 'Stylized atom or galaxy' },
  { type: 'Quiz', title: 'General Science Quiz', icon: <HelpCircle className="h-8 w-8 text-purple-500" />, link: '/quiz-zone/science-general', image: 'Question mark with gears background' },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const FeaturedResources = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 font-poppins">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item, index) => (
            <motion.custom
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              elementType="div"
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 card-hover-pop bg-white">
                <div className="relative h-48 bg-gray-200">
                  <img  
                    alt={item.title} 
                    className="w-full h-full object-cover"
                   src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {item.type}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {item.icon}
                    <CardTitle className="ml-3 text-xl font-poppins">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4 font-inter">
                    Discover key concepts in {item.title.toLowerCase()}. Perfect for beginners and revision.
                  </p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                    <Link to={item.link}>
                      Access Resource <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.custom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;