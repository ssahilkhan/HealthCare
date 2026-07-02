import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  CalendarDays, 
  Phone, 
  Users, 
  ArrowRight,
  Heart,
  Activity,
  Laptop as NotebookText // Corrected import alias
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useMedications } from '@/hooks/useMedications';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { useCommunity } from '@/hooks/useCommunity';
import QuickAccessWidget from '@/components/home/QuickAccessWidget';
import UpcomingAppointmentsWidget from '@/components/home/UpcomingAppointmentsWidget';
import MedicationReminderCard from '@/components/home/widgets/MedicationReminderCard';
import EmergencyContactPreview from '@/components/home/widgets/EmergencyContactPreview';
import CommunityEventPreview from '@/components/home/widgets/CommunityEventPreview';

const dailyWellnessTips = [
  "Take a few minutes for deep breathing today. It can calm your mind and reduce stress.",
  "A short walk, even indoors, can boost your energy and mood.",
  "Stay hydrated! Drink water regularly throughout the day.",
  "Connect with a loved one today. A simple call can make a big difference.",
  "Eat a colorful fruit or vegetable with your next meal.",
  "Do a simple stretching exercise to keep your joints flexible.",
  "Listen to your favorite music for a few minutes to relax or uplift your spirits.",
  "Take a moment to appreciate something small and beautiful around you."
];

const HomePage = () => {
  const { medications, getDueMedications, markMedicationAsTaken } = useMedications();
  const { contacts: emergencyContacts } = useEmergencyContacts();
  const { events } = useCommunity();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dueMedications, setDueMedications] = useState([]);
  const [currentWellnessTip, setCurrentWellnessTip] = useState(dailyWellnessTips[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setDueMedications(getDueMedications(now));
    }, 60000); 
    
    setDueMedications(getDueMedications(new Date()));
    setCurrentWellnessTip(dailyWellnessTips[Math.floor(Math.random() * dailyWellnessTips.length)]);
    
    return () => clearInterval(timer);
  }, [getDueMedications]);
  
  const formatTime = (timeStringOrDate) => {
    if (!timeStringOrDate) return '';
    let dateObj;
    if (typeof timeStringOrDate === 'string') {
      const [hours, minutes] = timeStringOrDate.split(':');
      dateObj = new Date();
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    } else {
      dateObj = timeStringOrDate;
    }
    return dateObj.toLocaleTimeString('en-US', { 
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
  
  const getUpcomingEvents = () => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };
  
  const upcomingCommunityEvents = getUpcomingEvents();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };
  
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={itemVariants}>
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Welcome to CareCompanion</h1>
          <div className="text-lg sm:text-xl text-gray-700">
            <p>{formatDate(currentTime)}</p>
            <p className="text-2xl sm:text-3xl font-semibold mt-1 text-secondary-foreground">{formatTime(currentTime)}</p>
          </div>
        </div>
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <QuickAccessWidget />
      </motion.section>

      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center text-gray-800">
            <Bell className="mr-2 h-6 w-6 text-red-500" />
            Medication Reminders
          </h2>
          <Link to="/medications">
            <Button variant="ghost" size="sm" className="flex items-center text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {dueMedications.length > 0 ? (
          <div className="space-y-4">
            {dueMedications.map(med => (
              <MedicationReminderCard 
                key={med.medication.id + med.time} 
                medication={med.medication} 
                onMarkTaken={() => markMedicationAsTaken(med.medication.id, med.time)}
                formatTime={(timeStr) => formatTime(timeStr)} 
              />
            ))}
          </div>
        ) : (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Bell className="mx-auto h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-xl font-medium text-green-700">All Clear!</h3>
              <p className="text-green-600 mt-2">
                No medications due right now. Your next scheduled dose will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <UpcomingAppointmentsWidget />
      </motion.section>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center text-gray-800">
              <Phone className="mr-2 h-5 w-5 text-red-500" />
              Emergency Contacts
            </CardTitle>
            <Link to="/emergency-contacts">
              <Button variant="ghost" size="sm" className="flex items-center text-primary hover:text-primary/80">
                Manage <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {emergencyContacts.length > 0 ? (
              <ul className="space-y-3">
                {emergencyContacts.slice(0, 2).map(contact => (
                  <EmergencyContactPreview key={contact.id} contact={contact} />
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <Phone className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-500 mb-3">No emergency contacts added yet.</p>
                <Link to="/emergency-contacts">
                  <Button variant="outline" size="sm">Add Contacts</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
           <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center text-gray-800">
              <Users className="mr-2 h-5 w-5 text-purple-500" />
              Community Events
            </CardTitle>
            <Link to="/community">
              <Button variant="ghost" size="sm" className="flex items-center text-primary hover:text-primary/80">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingCommunityEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingCommunityEvents.map(event => (
                  <CommunityEventPreview key={event.id} event={event} />
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <CalendarDays className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-500 mb-3">No upcoming events in the next 7 days.</p>
                <Link to="/community">
                  <Button variant="outline" size="sm">View Community Page</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.section variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-none shadow-lg">
          <CardHeader className="items-center">
            <Activity className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-center text-xl font-semibold text-primary">Daily Wellness Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.p 
              key={currentWellnessTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg text-gray-700"
            >
              "{currentWellnessTip}"
            </motion.p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button 
              variant="outline" 
              className="bg-white/70 hover:bg-white border-primary/50 text-primary"
              onClick={() => setCurrentWellnessTip(dailyWellnessTips[Math.floor(Math.random() * dailyWellnessTips.length)])}
            >
              Get Another Tip
            </Button>
          </CardFooter>
        </Card>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;