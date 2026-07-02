
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Pill, 
  Phone, 
  Users, 
  Settings, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
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
    { path: '/community', label: 'Community', icon: <Users className="h-6 w-6" /> },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-primary rounded-full p-2"
            >
              <Bell className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-primary">CareCompanion</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={showNotification}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg z-50"
        >
          <nav className="container mx-auto py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg text-lg ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto">
          <nav className="hidden md:block py-4">
            <ul className="flex justify-center space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center p-2 rounded-lg elderly-friendly ${
                      location.pathname === item.path
                        ? 'text-primary font-semibold'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {item.icon}
                    <span className="mt-1">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden py-2 px-4">
            <ul className="flex justify-between">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center p-2 ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="text-center py-4 text-sm text-gray-500">
            <p>© 2025 CareCompanion. All rights reserved.</p>
            <p className="mt-1">Designed with care for elderly users</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
