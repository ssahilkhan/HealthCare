import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    appointmentReminders: true,
    healthLogPrompts: false,
    communityUpdates: true,
    emailNotifications: true,
    pushNotifications: true, // Assuming app context, might be mobile specific
    soundAlerts: true,
  });
  
  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleSaveNotifications = () => {
    // Save notification preferences
    console.log("Notification settings saved:", notifications);
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
      className: "bg-green-500 text-white",
    });
  };

  const notificationOptions = [
    { id: "medicationReminders", label: "Medication Reminders" },
    { id: "appointmentReminders", label: "Appointment Reminders" },
    { id: "healthLogPrompts", label: "Health Log Prompts" },
    { id: "communityUpdates", label: "Community Updates & New Posts" },
  ];

  const deliveryOptions = [
    { id: "emailNotifications", label: "Email Notifications" },
    { id: "pushNotifications", label: "Push Notifications (App)" },
    { id: "soundAlerts", label: "Sound Alerts for Critical Reminders" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-primary">
            <Bell className="mr-2 h-6 w-6" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700">App Alerts</h3>
            <div className="space-y-4">
              {notificationOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Checkbox 
                    id={option.id} 
                    checked={notifications[option.id]}
                    onCheckedChange={() => handleNotificationChange(option.id)}
                    className="h-5 w-5"
                  />
                  <Label htmlFor={option.id} className="font-normal text-lg text-gray-800 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Delivery Methods</h3>
            <div className="space-y-4">
              {deliveryOptions.map(option => (
                 <div key={option.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Checkbox 
                    id={option.id} 
                    checked={notifications[option.id]}
                    onCheckedChange={() => handleNotificationChange(option.id)}
                    className="h-5 w-5"
                  />
                  <Label htmlFor={option.id} className="font-normal text-lg text-gray-800 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleSaveNotifications} size="lg" className="w-full md:w-auto text-lg py-3 px-6 bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-5 w-5" />
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NotificationSettings;