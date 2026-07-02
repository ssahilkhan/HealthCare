import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Pill, Phone, Users, Settings, Menu, X, Bell, Heart, Apple, Zap, Brain, LifeBuoy, Laptop as NotebookText, CalendarDays as // Changed from BookHeart
  CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-6 w-6" /> },
    { path: '/medications', label: 'Medications', icon: <Pill className="h-6 w-6" /> },
    { path: '/emergency-contacts', label: 'Emergency', icon: <Phone className="h-6 w-6" /> },
    { path: '/health-journal', label: 'Health Log', icon: <NotebookText className="h-6 w-6" /> }, // Changed from BookHeart
    { path: '/appointments', label: 'Appointments', icon: <CalendarDays className="h-6 w-6" /> },
    { path: '/nutrition', label: 'Nutrition', icon: <Apple className="h-6 w-6" /> },
    { path: '/wellness', label: 'Wellness', icon: <Zap className="h-6 w-6" /> },
    { path: '/mental-wellness', label: 'Mind', icon: <Brain className="h-6 w-6" /> },
    { path: '/family-network', label: 'Family', icon: <Users className="h-6 w-6" /> },
    { path: '/community', label: 'Community', icon: <Users className="h-6 w-6" /> },
    { path: '/help', label: 'Help', icon: <LifeBuoy className="h-6 w-6" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-6 w-6" /> },
  ];

  const showNotification = () => {
    toast({
      title: "Reminder",
      description: "It's time to take your heart medication.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md py-3 px-4 sm:px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
              className="bg-primary rounded-full p-2"
            >
              <Heart className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-bold text-primary">CareCompanion</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={showNotification}
              className="relative text-gray-600 hover:text-primary"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse">
                2
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 hover:text-primary" 
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg fixed top-16 left-0 right-0 z-40 overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <nav className="container mx-auto py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg text-lg transition-colors duration-150 ${
                      location.pathname === item.path
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {React.cloneElement(item.icon, { className: `h-5 w-5 ${location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-primary'}` })}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}

      <div className="flex flex-1 container mx-auto">
        <aside className="hidden md:block w-64 py-8 pr-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center p-3 rounded-lg text-base transition-colors duration-150 ${
                      location.pathname === item.path
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                     {React.cloneElement(item.icon, { className: `h-5 w-5 ${location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-primary'}` })}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-grow px-0 md:px-4 py-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <footer className="bg-white shadow-inner mt-auto border-t">
        <div className="container mx-auto text-center py-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} CareCompanion. All rights reserved.</p>
            <p className="mt-1">Designed with <Heart className="inline h-4 w-4 text-red-500" /> for our beloved seniors.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;