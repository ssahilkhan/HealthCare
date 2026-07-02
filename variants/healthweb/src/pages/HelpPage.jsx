import React from 'react';
import { LifeBuoy, MessageSquare as MessageSquareQuestion, BookOpen, Phone, Settings, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HelpPage = () => {
  const { toast } = useToast();

  const faqItems = [
    {
      id: "faq1",
      question: "How do I add a new medication reminder?",
      answer: "Navigate to the 'Medications' page from the main menu. Click the 'Add Medication' button. Fill in the medication name, dosage, instructions, and set the schedule times. Click 'Add Medication' to save."
    },
    {
      id: "faq2",
      question: "How can I edit or delete an emergency contact?",
      answer: "Go to the 'Emergency' page. Find the contact you wish to modify. Click the pencil icon to edit or the trash icon to delete. Confirm your action in the pop-up window."
    },
    {
      id: "faq3",
      question: "How do I change the app's font size or color theme?",
      answer: "Visit the 'Settings' page. Under 'Accessibility', you'll find options to adjust font size using a slider and select different color modes (Light, Dark, High Contrast)."
    },
    {
      id: "faq4",
      question: "Is my personal health information secure?",
      answer: "Yes, we take your privacy very seriously. Your data is stored securely using industry-standard encryption. For more details, please refer to our Privacy Policy (link in settings)."
    },
    {
      id: "faq5",
      question: "How do I log my daily health metrics like blood pressure?",
      answer: "Go to the 'Health Journal' page. Click 'Add Entry', fill in your readings for blood pressure, blood sugar, temperature, mood, pain level, and any notes, then save the entry."
    },
    {
      id: "faq6",
      question: "What if I need urgent help?",
      answer: "If you are experiencing a medical emergency, please use the large 'Call Emergency (911)' button on the 'Emergency' page or dial your local emergency number immediately. This app is a tool to assist, not a replacement for emergency services."
    }
  ];

  const handleSubmitSupportForm = (e) => {
    e.preventDefault();
    toast({
      title: "Support Request Submitted",
      description: "Thank you for contacting us! We will review your message and get back to you as soon as possible.",
      duration: 5000,
    });
    e.target.reset();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center">
          <LifeBuoy className="mr-3 h-8 w-8 text-blue-500" />
          Help & Support Center
        </h1>
        <p className="text-gray-600 mt-1">Find answers, guides, and contact support if you need assistance.</p>
      </header>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq" className="text-base"><MessageSquareQuestion className="mr-2 h-5 w-5" />FAQ</TabsTrigger>
          <TabsTrigger value="guides" className="text-base"><BookOpen className="mr-2 h-5 w-5" />Guides</TabsTrigger>
          <TabsTrigger value="contact" className="text-base"><Phone className="mr-2 h-5 w-5" />Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions about using CareCompanion.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem value={item.id} key={item.id}>
                    <AccordionTrigger className="text-base text-left hover:no-underline">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How-To Guides</CardTitle>
              <CardDescription>Step-by-step instructions for using CareCompanion features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Getting Started with CareCompanion", icon: <BookOpen className="text-green-600"/>, description: "Learn the basics of navigating and using the app.", link: "#" },
                { title: "Managing Your Medication Schedule", icon: <BookOpen className="text-green-600"/>, description: "A detailed guide on adding, editing, and tracking medications.", link: "/medications" },
                { title: "Setting Up Emergency Contacts & Medical ID", icon: <BookOpen className="text-green-600"/>, description: "Ensure your critical information is up-to-date.", link: "/emergency-contacts" },
                { title: "Using the Health Journal Effectively", icon: <BookOpen className="text-green-600"/>, description: "Tips for logging and understanding your health data.", link: "/health-journal" },
                { title: "Connecting with Family & Community", icon: <BookOpen className="text-green-600"/>, description: "Learn how to use the Family Network and Community features.", link: "/family-network" },
                { title: "Customizing Accessibility Settings", icon: <Settings className="text-blue-600"/>, description: "Personalize font size, color themes, and more.", link: "/settings" },
              ].map(guide => (
                <Link to={guide.link} key={guide.title} className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-gray-100 rounded-full">{guide.icon}</div>
                    <div>
                      <h4 className="font-semibold text-primary">{guide.title}</h4>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>If you need further assistance, please reach out to us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+18001234567" className="flex-1">
                  <Button variant="outline" className="w-full text-lg py-6">
                    <Phone className="mr-2 h-5 w-5" /> Call Us: +1-800-123-4567
                  </Button>
                </a>
                <a href="mailto:support@carecompanion.app" className="flex-1">
                   <Button variant="outline" className="w-full text-lg py-6">
                    <MessageSquareQuestion className="mr-2 h-5 w-5" /> Email Us
                  </Button>
                </a>
              </div>
              
              <form onSubmit={handleSubmitSupportForm} className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Send us a message:</h3>
                <div>
                  <Label htmlFor="support-name" className="text-base">Your Name</Label>
                  <Input id="support-name" type="text" placeholder="Enter your name" required className="mt-1 text-base p-3" />
                </div>
                <div>
                  <Label htmlFor="support-email" className="text-base">Your Email</Label>
                  <Input id="support-email" type="email" placeholder="Enter your email" required className="mt-1 text-base p-3" />
                </div>
                <div>
                  <Label htmlFor="support-message" className="text-base">Your Message</Label>
                  <Textarea id="support-message" placeholder="Describe your issue or question..." required rows={5} className="mt-1 text-base p-3" />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">Send Message</Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-600" /> We typically respond within 24-48 hours. For urgent medical issues, please contact emergency services.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpPage;