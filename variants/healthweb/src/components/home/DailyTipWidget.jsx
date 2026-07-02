import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

const tips = [
  "Stay hydrated! Drink plenty of water throughout the day.",
  "A short walk each day can do wonders for your health.",
  "Connect with a friend or family member today.",
  "Eat a balanced meal with plenty of fruits and vegetables.",
  "Get a good night's sleep to feel refreshed.",
  "Practice deep breathing exercises for a few minutes to relax.",
  "Engage in a hobby you enjoy to boost your mood.",
  "Keep your mind active with puzzles or reading.",
  "Remember to take your medications as prescribed.",
  "Gentle stretching can help maintain flexibility."
];

const DailyTipWidget = () => {
  const [currentTip, setCurrentTip] = useState('');

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 border-none shadow-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-xl sm:text-2xl font-bold flex items-center justify-center text-yellow-700">
              <Lightbulb className="mr-3 h-7 w-7 text-yellow-500" />
              Daily Wellness Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[80px] flex items-center justify-center">
            <motion.p 
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-base sm:text-lg text-gray-700 px-4"
            >
              {currentTip}
            </motion.p>
          </CardContent>
          <CardFooter className="justify-center pt-2 pb-4">
            <Button 
              variant="outline" 
              onClick={getRandomTip} 
              className="bg-white/70 border-yellow-400 text-yellow-700 hover:bg-white hover:border-yellow-500"
              aria-label="Get another tip"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Another Tip
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
};

export default DailyTipWidget;