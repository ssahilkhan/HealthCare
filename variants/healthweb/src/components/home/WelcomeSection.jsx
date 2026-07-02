import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const userName = "User";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 p-6 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
          Welcome, {userName}!
        </h1>
        <div className="text-lg sm:text-xl text-gray-700">
          <p>{formatDate(currentTime)}</p>
          <p className="text-xl sm:text-2xl font-semibold mt-1 text-gray-800">{formatTime(currentTime)}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default WelcomeSection;