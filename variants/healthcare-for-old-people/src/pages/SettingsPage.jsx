
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Save,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { clearLocalStorage } from '@/lib/localStorage';

const SettingsPage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    emergencyContact: 'Mary Smith',
    emergencyPhone: '(555) 987-6543'
  });
  
  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    upcomingEvents: true,
    communityPosts: false,
    emailNotifications: true,
    soundAlerts: true
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleClearData = () => {
    clearLocalStorage();
    
    toast({
      title: "Data Cleared",
      description: "All your data has been cleared from this device.",
      variant: "destructive",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center">
          <Settings className="mr-2 h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </header>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile" className="text-lg">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-lg">Notifications</TabsTrigger>
          <TabsTrigger value="help" className="text-lg">Help & Support</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">Emergency Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input 
                      id="emergencyContact" 
                      name="emergencyContact"
                      value={profile.emergencyContact}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input 
                      id="emergencyPhone" 
                      name="emergencyPhone"
                      type="tel"
                      value={profile.emergencyPhone}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-red-600">
                  <Shield className="mr-2 h-5 w-5" />
                  Account Management
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All Data</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all your personal data, medications, contacts, and community interactions from this device. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleClearData}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Clear Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="medicationReminders" 
                      checked={notifications.medicationReminders}
                      onCheckedChange={() => handleNotificationChange('medicationReminders')}
                    />
                    <Label htmlFor="medicationReminders" className="font-normal">
                      Medication Reminders
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="upcomingEvents" 
                      checked={notifications.upcomingEvents}
                      onCheckedChange={() => handleNotificationChange('upcomingEvents')}
                    />
                    <Label htmlFor="upcomingEvents" className="font-normal">
                      Upcoming Events
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="communityPosts" 
                      checked={notifications.communityPosts}
                      onCheckedChange={() => handleNotificationChange('communityPosts')}
                    />
                    <Label htmlFor="communityPosts" className="font-normal">
                      Community Posts and Replies
                    </Label>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">Notification Methods</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="emailNotifications" 
                        checked={notifications.emailNotifications}
                        onCheckedChange={() => handleNotificationChange('emailNotifications')}
                      />
                      <Label htmlFor="emailNotifications" className="font-normal">
                        Email Notifications
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="soundAlerts" 
                        checked={notifications.soundAlerts}
                        onCheckedChange={() => handleNotificationChange('soundAlerts')}
                      />
                      <Label htmlFor="soundAlerts" className="font-normal">
                        Sound Alerts
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Help & Support Tab */}
        <TabsContent value="help">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-medium">How do I set up medication reminders?</h4>
                      <p className="text-gray-600 mt-1">
                        Go to the Medications tab, add your medication details including name, dosage, and schedule times. The app will automatically remind you when it's time to take your medication.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Can I add emergency contacts?</h4>
                      <p className="text-gray-600 mt-1">
                        Yes, visit the Emergency Contacts tab and click "Add Contact" to add important contacts that you may need to reach quickly in case of emergency.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">How do I join community events?</h4>
                      <p className="text-gray-600 mt-1">
                        Browse available events in the Community tab and click "RSVP" on any event you'd like to attend. You can also create your own events for others to join.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">Contact Support</h3>
                  
                  <p className="text-gray-600 mb-4">
                    Need additional help? Our support team is available to assist you.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="supportMessage">Message</Label>
                      <Input 
                        id="supportMessage"
                        placeholder="Describe your issue or question"
                        className="mt-1"
                      />
                    </div>
                    
                    <Button className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-blue-700 mb-2">Tutorial Videos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    How to Set Up Medication Reminders
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Managing Emergency Contacts
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Joining Community Events
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Complete App Walkthrough
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
