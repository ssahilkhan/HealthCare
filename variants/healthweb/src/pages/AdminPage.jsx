import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.username === 'admin' && formData.password === 'password') {
      toast({
        title: "Login Successful",
        description: "Welcome, Admin! Redirecting to dashboard...",
      });
      // In a real app, you'd set auth state and redirect to an admin dashboard
      // For now, let's just navigate to home as a placeholder
      setTimeout(() => navigate('/'), 2000); 
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-white rounded-full p-3 w-fit mb-4">
              <ShieldCheck size={32} />
            </div>
            <CardTitle className="text-3xl font-poppins">Admin Login</CardTitle>
            <p className="text-gray-600 font-inter">Access the EduPortal management panel.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="font-inter text-base">Username</Label>
                <Input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  placeholder="Enter your username" 
                  className="mt-1 text-base py-3" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="password" className="font-inter text-base">Password</Label>
                <Input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Enter your password" 
                  className="mt-1 text-base py-3" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Logging In...' : 'Log In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            <p>This page is for authorized administrators only.</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminPage;