import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Clock, Check, ArrowRight, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMedications } from '@/hooks/useMedications';

const MedicationRemindersWidget = () => {
  const { medications, getDueMedications, markMedicationAsTaken } = useMedications();
  const [dueMedications, setDueMedications] = useState([]);

  useEffect(() => {
    setDueMedications(getDueMedications());
    const interval = setInterval(() => {
        setDueMedications(getDueMedications());
    }, 60000);
    return () => clearInterval(interval);
  }, [getDueMedications, medications]);

  return (
    <section>
      <Card className="shadow-lg border-t-4 border-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold flex items-center text-primary">
            <Bell className="mr-3 h-7 w-7" />
            Medication Reminders
          </CardTitle>
          <Link to="/medications">
            <Button variant="ghost" size="sm" className="flex items-center text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        
        <CardContent>
          {dueMedications.length > 0 ? (
            <div className="space-y-4">
              {dueMedications.map(med => (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <Card className="border-l-4 border-red-500 bg-red-50/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-red-700">{med.name}</h3>
                        <p className="text-gray-600">{med.dosage}</p>
                        <div className="flex items-center mt-1 text-red-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due now</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => markMedicationAsTaken(med.id)}
                        className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
                        aria-label={`Mark ${med.name} as taken`}
                      >
                        <Check className="mr-2 h-5 w-5" />
                        Mark as Taken
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Pill className="mx-auto h-12 w-12 text-green-500 mb-3" />
              <h3 className="text-xl font-medium text-green-700">No medications due right now.</h3>
              <p className="text-gray-600 mt-2">
                You're all caught up! Your next medication will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MedicationRemindersWidget;