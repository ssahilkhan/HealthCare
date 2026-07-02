import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    // Simulate form submission
    console.log("Form data submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">Contact Us</h1>
        <p className="text-lg text-blue-100 mt-2 font-inter">We'd love to hear from you! Reach out with any questions or feedback.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-poppins flex items-center">
                <Send className="mr-2 h-6 w-6 text-primary" /> Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-inter">Full Name</Label>
                  <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="mt-1 text-base" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-inter">Email Address</Label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="mt-1 text-base" />
                </div>
                <div>
                  <Label htmlFor="subject" className="font-inter">Subject</Label>
                  <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Reason for contacting" className="mt-1 text-base" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-inter">Message</Label>
                  <textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    rows={5} placeholder="Your message..."
                    className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-3">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-poppins text-primary">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold font-inter">Email</h3>
                  <a href="mailto:info@eduportal.org" className="text-gray-700 hover:text-primary font-inter">info@eduportal.org</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold font-inter">Phone</h3>
                  <a href="tel:+1234567890" className="text-gray-700 hover:text-primary font-inter">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold font-inter">Address</h3>
                  <p className="text-gray-700 font-inter">123 Learning Lane, Education City, EC 45678</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl font-poppins text-secondary">Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-inter">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-700 font-inter">Saturday - Sunday: Closed</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;