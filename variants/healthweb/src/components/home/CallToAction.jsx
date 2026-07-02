import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <motion.section 
      className="py-12 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <Users className="mx-auto h-16 w-16 mb-4 text-yellow-300" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Caring Community
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Connect with fellow members, share experiences, and participate in local events. Our community is a place for support, friendship, and engagement.
        </p>
        <Link to="/community">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
            aria-label="Explore the community page"
          >
            Explore Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default CallToAction;