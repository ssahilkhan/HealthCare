import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Phone, Laptop as NotebookText, Users, MessageSquare as CommunityIcon, CalendarDays, Apple, Zap, Brain, LifeBuoy } from 'lucide-react'; // Changed BookHeart to NotebookText
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMedications } from '@/hooks/useMedications';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { useFamilyMembers } from '@/hooks/useFamilyMembers'; 
import { useAppointments } from '@/hooks/useAppointments';

const QuickAccessWidget = () => {
  const { medications } = useMedications();
  const { contacts: emergencyContacts } = useEmergencyContacts();
  const { familyMembers } = useFamilyMembers(); 
  const { appointments } = useAppointments();

  const quickLinks = [
    {
      title: 'Medications',
      icon: <Pill className="h-8 w-8 text-blue-500" />,
      path: '/medications',
      count: medications.length,
      countLabel: 'meds',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      buttonColor: 'bg-blue-500'
    },
    {
      title: 'Emergency',
      icon: <Phone className="h-8 w-8 text-red-500" />,
      path: '/emergency-contacts',
      count: emergencyContacts.length,
      countLabel: 'contacts',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      buttonColor: 'bg-red-500'
    },
    {
      title: 'Health Log',
      icon: <NotebookText className="h-8 w-8 text-green-500" />, // Changed BookHeart to NotebookText
      path: '/health-journal',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      buttonColor: 'bg-green-500'
    },
    {
      title: 'Appointments',
      icon: <CalendarDays className="h-8 w-8 text-indigo-500" />,
      path: '/appointments',
      count: appointments.length,
      countLabel: 'appts',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      buttonColor: 'bg-indigo-500'
    },
    {
      title: 'Nutrition',
      icon: <Apple className="h-8 w-8 text-lime-500" />,
      path: '/nutrition',
      bgColor: 'bg-lime-50',
      borderColor: 'border-lime-200',
      textColor: 'text-lime-700',
      buttonColor: 'bg-lime-500'
    },
    {
      title: 'Wellness',
      icon: <Zap className="h-8 w-8 text-pink-500" />,
      path: '/wellness',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      buttonColor: 'bg-pink-500'
    },
    {
      title: 'Mind Care',
      icon: <Brain className="h-8 w-8 text-yellow-500" />,
      path: '/mental-wellness',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      buttonColor: 'bg-yellow-500'
    },
    {
      title: 'Family',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      path: '/family-network',
      count: familyMembers.length,
      countLabel: 'members',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      buttonColor: 'bg-purple-500'
    },
    {
      title: 'Community',
      icon: <CommunityIcon className="h-8 w-8 text-cyan-500" />,
      path: '/community',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-700',
      buttonColor: 'bg-cyan-500'
    },
     {
      title: 'Help Center',
      icon: <LifeBuoy className="h-8 w-8 text-orange-500" />,
      path: '/help',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      buttonColor: 'bg-orange-500'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  return (
    <Card className="shadow-lg border-none bg-gradient-to-br from-slate-50 to-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-700">Quick Access Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.title} variants={itemVariants}>
              <Link to={link.path} className="block h-full group">
                <Card className={`hover:shadow-xl transition-all duration-300 h-full flex flex-col ${link.bgColor} border ${link.borderColor} group-hover:border-primary group-hover:scale-105`}>
                  <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center flex-grow">
                    <div className={`p-3 rounded-full mb-2 sm:mb-3 shadow-md transition-transform duration-300 group-hover:scale-110 ${link.buttonColor} bg-opacity-20`}>
                      {React.cloneElement(link.icon, {className: `h-7 w-7 sm:h-8 sm:w-8 ${link.textColor}`})}
                    </div>
                    <h3 className={`text-base sm:text-lg font-medium mb-1 ${link.textColor}`}>{link.title}</h3>
                    {link.count !== undefined && (
                       <p className={`text-xs sm:text-sm ${link.textColor} opacity-80`}>
                        {link.count} {link.countLabel}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessWidget;