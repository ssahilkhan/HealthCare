
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Phone, 
  Users, 
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useMedications } from '@/hooks/useMedications';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { useCommunity } from '@/hooks/useCommunity';

const HomePage = () => {
  const { medications, getDueMedications, markMedicationAsTaken } = useMedications();
  const { contacts } = useEmergencyContacts();
  const { events } = useCommunity();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dueMedications, setDueMedications] = useState([]);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setDueMedications(getDueMedications());
    }, 60000);
    
    // Initial check for due medications
    setDueMedications(getDueMedications());
    
    return () => clearInterval(timer);
  }, [getDueMedications, medications]);
  
  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  // Format date as "Weekday, Month Day"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get upcoming events (next 7 days)
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
  
  const upcomingEvents = getUpcomingEvents();
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome to CareCompanion</h1>
          <div className="text-xl text-gray-600">
            <p>{formatDate(currentTime)}</p>
            <p className="text-2xl font-semibold mt-1">{formatTime(currentTime)}</p>
          </div>
        </motion.div>
      </section>
      
      {/* Medication Reminders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <Bell className="mr-2 h-6 w-6 text-primary" />
            Medication Reminders
          </h2>
          <Link to="/medications">
            <Button variant="ghost" size="sm" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {dueMedications.length > 0 ? (
          <div className="space-y-4">
            {dueMedications.map(med => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{med.name}</h3>
                      <p className="text-gray-600">{med.dosage}</p>
                      <div className="flex items-center mt-1 text-red-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due now</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => markMedicationAsTaken(med.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Taken
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-medium text-green-700">No medications due right now</h3>
              <p className="text-green-600 mt-2">
                You're all caught up! Your next medication will be shown here when it's time.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
      
      {/* Quick Access */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Phone className="mr-2 h-6 w-6 text-primary" />
              Emergency Contacts
            </h2>
            <Link to="/emergency-contacts">
              <Button variant="ghost" size="sm" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {contacts.length > 0 ? (
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-4">
                  {contacts.slice(0, 3).map(contact => (
                    <li key={contact.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-gray-600">{contact.relationship}</p>
                      </div>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-blue-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-medium text-blue-700">No emergency contacts</h3>
                <p className="text-blue-600 mt-2">
                  Add important contacts for quick access during emergencies.
                </p>
                <Link to="/emergency-contacts">
                  <Button className="mt-4">
                    Add Contacts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Community Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary" />
              Upcoming Events
            </h2>
            <Link to="/community">
              <Button variant="ghost" size="sm" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-4">
                  {upcomingEvents.map(event => (
                    <li key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="flex items-center mt-1 text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{event.attendees?.length || 0} attending</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-purple-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-medium text-purple-700">No upcoming events</h3>
                <p className="text-purple-600 mt-2">
                  Check the community page to find and join local events.
                </p>
                <Link to="/community">
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                    Explore Community
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      {/* Quick Tips */}
      <section>
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardHeader>
            <CardTitle className="text-center text-primary">Daily Wellness Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg">
              "Regular gentle exercise like walking or stretching can improve your mood and help maintain mobility."
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline">Get Another Tip</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
