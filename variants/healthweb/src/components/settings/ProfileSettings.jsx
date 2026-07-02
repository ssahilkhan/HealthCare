import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ProfileSettings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Smith', // Replace with actual user data if available
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    // Here you would typically save to a backend or Supabase
    console.log("Profile saved:", profile);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-primary">
            <User className="mr-2 h-6 w-6" />
            Personal Information
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="text-lg py-3 px-4"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="text-lg py-3 px-4"
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleProfileChange}
              className="text-lg py-3 px-4"
              placeholder="Enter your phone number"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleSaveProfile} size="lg" className="w-full md:w-auto text-lg py-3 px-6 bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProfileSettings;