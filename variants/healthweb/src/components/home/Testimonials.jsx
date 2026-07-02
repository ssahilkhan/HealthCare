import React from 'react';
import { motion } from 'framer-motion';
import { Star, UserCircle } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Aisha Khan', role: 'Student, Grade 10', quote: "EduPortal has been a game-changer for my studies. The video lectures are so easy to understand!", avatarText: "Student using a tablet for learning", image: "Young student smiling while using a tablet" },
  { id: 2, name: 'Ravi Sharma', role: 'Aspiring Developer', quote: "The coding tutorials are fantastic! I've learned so much about Python and web development for free.", avatarText: "Young man coding on a laptop", image: "Focused young man working on a laptop" },
  { id: 3, name: 'Priya Singh', role: 'Parent', quote: "As a parent, I'm grateful for this platform. It provides quality resources that my child can access anytime.", avatarText: "Parent helping child with studies", image: "Parent and child studying together at a desk" },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 via-green-500/5 to-blue-500/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 flex-grow font-inter">"{testimonial.quote}"</p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <img  
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                   src="https://images.unsplash.com/photo-1677696795873-ca21e7d76a51" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 font-poppins">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-inter">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;