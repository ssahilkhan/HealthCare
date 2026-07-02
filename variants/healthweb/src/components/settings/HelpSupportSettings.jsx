import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { LifeBuoy, MessageSquare as MessageSquareQuestion, BookOpen, Phone } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const HelpSupportSettings = () => {
  const faqItems = [
    {
      question: "How do I add a new medication?",
      answer: "Navigate to the 'Medications' page and click the 'Add Medication' button. Fill in the details and save."
    },
    {
      question: "Can I change my emergency contact?",
      answer: "Yes, go to the 'Emergency' page, find the contact you want to edit, and click the edit icon. You can also delete contacts."
    },
    {
      question: "How do I adjust the font size?",
      answer: "In the 'Settings' page, under 'Accessibility', you will find a slider to adjust the font size to your preference."
    },
    {
      question: "Is my data secure?",
      answer: "We prioritize your data security. All personal information is stored securely and encrypted. Please review our privacy policy for more details."
    }
  ];

  const handleSubmitSupportForm = (e) => {
    e.preventDefault();
    alert("Support request submitted! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <LifeBuoy className="mr-2 h-6 w-6 text-primary" />
          Help & Support
        </CardTitle>
        <CardDescription>Find answers to common questions and get help.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="space-y-3">
          <h3 className="text-xl font-medium flex items-center">
            <MessageSquareQuestion className="mr-2 h-5 w-5 text-blue-600" />
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-base text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-green-600" />
            How-to Guides
          </h3>
          <ul className="list-disc list-inside space-y-1 text-base">
            <li><a href="#" className="text-primary hover:underline">Getting Started with CareCompanion</a></li>
            <li><a href="#" className="text-primary hover:underline">Managing Your Medication Schedule</a></li>
            <li><a href="#" className="text-primary hover:underline">Setting Up Emergency Contacts</a></li>
            <li><a href="#" className="text-primary hover:underline">Using the Health Journal Effectively</a></li>
          </ul>
        </div>

        <div className="space-y-4 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-medium flex items-center">
             <Phone className="mr-2 h-5 w-5 text-purple-600" />
            Contact Support
          </h3>
          <p className="text-sm text-gray-600">
            If you can't find an answer, feel free to reach out to our support team.
          </p>
          
          <div className="mb-6">
            <a href="tel:+18001234567">
              <Button variant="outline" className="w-full sm:w-auto text-lg py-3">
                <Phone className="mr-2 h-5 w-5" /> Tap to Call: +1-800-123-4567
              </Button>
            </a>
          </div>

          <form onSubmit={handleSubmitSupportForm} className="space-y-4">
            <div>
              <Label htmlFor="support-name" className="text-base">Your Name</Label>
              <Input id="support-name" type="text" placeholder="Enter your name" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="support-email" className="text-base">Your Email</Label>
              <Input id="support-email" type="email" placeholder="Enter your email" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="support-message" className="text-base">Your Message</Label>
              <Textarea id="support-message" placeholder="Describe your issue or question..." required rows={4} className="mt-1" />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
          </form>
        </div>

      </CardContent>
    </Card>
  );
};

export default HelpSupportSettings;