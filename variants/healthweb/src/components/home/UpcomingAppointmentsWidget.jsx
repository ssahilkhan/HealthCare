import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppointments } from '@/hooks/useAppointments'; 

const UpcomingAppointmentsWidget = () => {
  const { appointments, isLoading } = useAppointments(); 

  const upcomingAppointments = appointments
    .filter(appt => new Date(appt.date_time) >= new Date())
    .slice(0, 3);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold flex items-center">
          <CalendarDays className="mr-2 h-7 w-7 text-primary" />
          Upcoming Appointments
        </CardTitle>
        <Link to="/appointments">
          <Button variant="outline" size="sm">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : upcomingAppointments.length > 0 ? (
          <motion.ul 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {upcomingAppointments.map((appt, index) => (
              <motion.li 
                key={appt.id || index} 
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-primary">{appt.doctor_name || 'Appointment'}</h4>
                    <p className="text-sm text-gray-600">{appt.purpose || 'Check-up'}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{formatDate(appt.date_time)}</span>
                </div>
                {appt.location && <p className="text-xs text-gray-500 mt-1">Location: {appt.location}</p>}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="text-center py-6">
            <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500 mb-4">No upcoming appointments.</p>
            <Link to="/appointments">
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" /> Add Appointment
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsWidget;