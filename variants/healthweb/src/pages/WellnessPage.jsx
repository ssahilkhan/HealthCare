import React, { useState } from 'react';
import { Heart, Zap, Wind, Footprints, CheckCircle, Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const exercises = [
  {
    id: 'gentle_walk',
    name: "Gentle Indoor Walk",
    description: "A 10-minute walk around your home to get your body moving and improve circulation.",
    duration: "10 min",
    type: "Cardio",
    videoUrl: "https://www.youtube.com/embed/Vk_f2fMA8jA",
    imagePlaceholder: "Elderly person walking indoors with a walker",
    alt: "Elderly person walking indoors with a walker"
  },
  {
    id: 'chair_yoga',
    name: "Chair Yoga Stretches",
    description: "Simple yoga poses done while seated to improve flexibility, balance, and reduce stress.",
    duration: "15 min",
    type: "Stretching",
    videoUrl: "https://www.youtube.com/embed/9i3K42L5818",
    imagePlaceholder: "Senior performing chair yoga in a bright room",
    alt: "Senior performing chair yoga"
  },
  {
    id: 'arm_leg_raises',
    name: "Seated Arm & Leg Raises",
    description: "Strengthen your arms and legs while seated, helping with daily activities.",
    duration: "10 min",
    type: "Strength",
    videoUrl: "https://www.youtube.com/embed/ASXA_n95pG0",
    imagePlaceholder: "Senior doing seated leg raises in a comfortable chair",
    alt: "Senior doing seated leg raises"
  },
  {
    id: 'shoulder_rolls',
    name: "Shoulder Rolls & Neck Stretches",
    description: "Relieve tension in your neck and shoulders with these gentle movements.",
    duration: "5 min",
    type: "Stretching",
    videoUrl: "https://www.youtube.com/embed/rVd0Q9tKSoI", 
    imagePlaceholder: "Close up of a person gently rolling their shoulders",
    alt: "Person doing shoulder rolls"
  }
];

const breathingExercises = [
  {
    id: 'deep_breathing',
    name: "Deep Belly Breathing",
    description: "Calm your mind and body with slow, deep breaths. Helps reduce stress and anxiety.",
    duration: "5 min",
    gifPlaceholder: "Animation showing diaphragmatic breathing",
    alt: "Animation showing deep breathing exercise"
  },
  {
    id: 'box_breathing',
    name: "Box Breathing (4-4-4-4)",
    description: "Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat. Excellent for focus and calm.",
    duration: "5 min",
    gifPlaceholder: "Geometric animation of box breathing technique",
    alt: "Animation of box breathing technique"
  },
  {
    id: 'alternate_nostril',
    name: "Alternate Nostril Breathing",
    description: "A yogic breathing technique to balance energy and promote relaxation.",
    duration: "7 min",
    gifPlaceholder: "Illustration of alternate nostril breathing",
    alt: "Animation of alternate nostril breathing"
  }
];

const WellnessPage = () => {
  const [completedActivities, setCompletedActivities] = useState(() => {
    const saved = localStorage.getItem('completedWellnessActivities');
    return saved ? JSON.parse(saved) : {};
  });

  const [lastResetDate, setLastResetDate] = React.useState(() => {
    return localStorage.getItem('wellnessActivitiesLastReset') || new Date().toDateString();
  });

  React.useEffect(() => {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setCompletedActivities({});
      setLastResetDate(today);
      localStorage.setItem('completedWellnessActivities', JSON.stringify({}));
      localStorage.setItem('wellnessActivitiesLastReset', today);
    }
  }, [lastResetDate]);

  const toggleComplete = (activityId) => {
    setCompletedActivities(prev => {
      const newCompleted = { ...prev, [activityId]: !prev[activityId] };
      localStorage.setItem('completedWellnessActivities', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center">
          <Heart className="mr-3 h-8 w-8 text-pink-500" />
          Exercise & Wellness
        </h1>
        <p className="text-gray-600 mt-1">Encourage gentle activity and mindful practices for a healthier lifestyle.</p>
      </header>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises" className="text-base"><Zap className="mr-2 h-5 w-5" />Exercises</TabsTrigger>
          <TabsTrigger value="breathing" className="text-base"><Wind className="mr-2 h-5 w-5" />Breathing</TabsTrigger>
          <TabsTrigger value="steps" className="text-base"><Footprints className="mr-2 h-5 w-5" />Step Counter</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full flex flex-col ${completedActivities[exercise.id] ? 'bg-green-50 border-green-300' : ''}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {exercise.name}
                      {completedActivities[exercise.id] && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{exercise.type} - {exercise.duration}</p>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                       <img  src={exercise.image} alt={exercise.alt} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1673922553727-fe98ea114d5e" />
                    </div>
                    <p className="text-gray-600 text-sm">{exercise.description}</p>
                    {exercise.videoUrl && (
                      <a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm">
                        <Youtube className="mr-1 h-4 w-4" /> Watch Video Guide
                      </a>
                    )}
                  </CardContent>
                  <CardContent className="pt-0">
                     <Button 
                        onClick={() => toggleComplete(exercise.id)} 
                        className={`w-full ${completedActivities[exercise.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
                      >
                        {completedActivities[exercise.id] ? <><CheckCircle className="mr-2 h-5 w-5" /> Marked Done!</> : "Mark as Done"}
                      </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breathing" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breathingExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full flex flex-col ${completedActivities[exercise.id] ? 'bg-green-50 border-green-300' : ''}`}>
                  <CardHeader>
                     <CardTitle className="flex items-center justify-between">
                      {exercise.name}
                      {completedActivities[exercise.id] && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{exercise.duration}</p>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                      <img  src={exercise.gifUrl} alt={exercise.alt} className="max-h-full max-w-full object-contain" src="https://images.unsplash.com/photo-1608138403974-95b81bf5dd05" />
                    </div>
                    <p className="text-gray-600 text-sm">{exercise.description}</p>
                  </CardContent>
                   <CardContent className="pt-0">
                     <Button 
                        onClick={() => toggleComplete(exercise.id)} 
                        className={`w-full ${completedActivities[exercise.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
                      >
                        {completedActivities[exercise.id] ? <><CheckCircle className="mr-2 h-5 w-5" /> Marked Done!</> : "Mark as Done"}
                      </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="steps" className="mt-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-xl">
                <Footprints className="mr-2 h-7 w-7 text-teal-500" />
                Daily Step Counter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-teal-600 my-6">3,452 <span className="text-2xl">steps</span></p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-teal-500 h-4 rounded-full" style={{ width: '34.52%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Goal: 10,000 steps</p>
              <p className="text-xs text-gray-400 mt-4">(Step counter integration is a conceptual feature for this demo.)</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellnessPage;