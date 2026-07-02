import React, { useState } from 'react';
import { Phone, User, Plus, AlertTriangle, Heart, MessageCircle, Edit, Trash2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { useToast } from '@/components/ui/use-toast';
import EmergencyServiceButton from '@/components/emergency/EmergencyServiceButton';

const EmergencyPage = () => {
  const { contacts, addContact, updateContact, deleteContact } = useEmergencyContacts();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMedicalIdFormOpen, setIsMedicalIdFormOpen] = useState(false);
  const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', relationship: '' });
  const [medicalId, setMedicalId] = useState({
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    healthConditions: '',
  });
  const { toast } = useToast();

  const handleOpenContactForm = (contact = null) => {
    setEditingContact(contact);
    setContactForm(contact ? { ...contact } : { name: '', phone: '', relationship: '' });
    setIsContactFormOpen(true);
  };

  const handleSaveContact = () => {
    if (!contactForm.name || !contactForm.phone) {
      toast({ title: "Error", description: "Name and phone are required.", variant: "destructive" });
      return;
    }
    if (editingContact) {
      updateContact(editingContact.id, contactForm);
      toast({ title: "Success", description: "Contact updated successfully." });
    } else {
      if (contacts.length >= 3) {
        toast({ title: "Limit Reached", description: "You can add up to 3 emergency contacts.", variant: "destructive" });
        return;
      }
      addContact(contactForm);
      toast({ title: "Success", description: "Contact added successfully." });
    }
    setIsContactFormOpen(false);
  };

  const handleSaveMedicalId = () => {
    localStorage.setItem('medicalId', JSON.stringify(medicalId));
    toast({ title: "Success", description: "Medical ID saved successfully." });
    setIsMedicalIdFormOpen(false);
  };
  
  const loadMedicalId = () => {
    const savedMedicalId = localStorage.getItem('medicalId');
    if (savedMedicalId) {
      setMedicalId(JSON.parse(savedMedicalId));
    }
  };

  React.useEffect(() => {
    loadMedicalId();
  }, []);

  const generateQrCodeData = () => {
    return `
      Medical ID:
      Blood Group: ${medicalId.bloodGroup || 'N/A'}
      Allergies: ${medicalId.allergies || 'N/A'}
      Medications: ${medicalId.currentMedications || 'N/A'}
      Conditions: ${medicalId.healthConditions || 'N/A'}
    `.trim();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <Phone className="mr-3 h-8 w-8 text-red-500" />
          Emergency Center
        </h1>
        <p className="text-gray-600">Quick access to emergency services and contacts.</p>
      </header>

      <Card className="bg-red-50 border-red-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6" />
            Immediate Help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <a href="tel:911" className="w-full">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xl py-8 flex items-center justify-center gap-2"
              aria-label="Call Emergency 911"
            >
              <Phone className="h-8 w-8" /> Call Emergency (911)
            </Button>
          </a>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmergencyServiceButton 
              number="211" 
              label="Health & Human Services" 
              icon={<Heart className="h-5 w-5" />} 
              color="bg-blue-600"
            />
            <EmergencyServiceButton 
              number="311" 
              label="Non-Emergency City Services" 
              icon={<MessageCircle className="h-5 w-5" />} 
              color="bg-green-600"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <User className="mr-2 h-6 w-6 text-primary" />
            Your Emergency Contacts
          </CardTitle>
          {contacts.length < 3 && (
            <Button onClick={() => handleOpenContactForm()} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No emergency contacts added yet. Add up to 3.</p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="font-semibold text-lg">{contact.name}</p>
                    <p className="text-gray-600">{contact.relationship}</p>
                    <a href={`tel:${contact.phone}`} className="text-primary hover:underline flex items-center mt-1">
                      <Phone className="mr-1 h-4 w-4" /> {contact.phone}
                    </a>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                     <a href={`tel:${contact.phone}`} className="flex-grow sm:flex-grow-0">
                        <Button variant="default" className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
                            <Phone className="mr-2 h-5 w-5" /> Call
                        </Button>
                    </a>
                    <Button variant="outline" size="icon" onClick={() => handleOpenContactForm(contact)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {contact.name}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteContact(contact.id)} className="bg-red-500 hover:bg-red-600">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-6 w-6 text-red-500" />
            Medical ID
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setIsMedicalIdFormOpen(true)} size="sm" variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Medical ID
            </Button>
            <Button onClick={() => setIsQrCodeDialogOpen(true)} size="sm" variant="outline">
              <QrCode className="mr-2 h-4 w-4" /> Show QR Code
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Blood Group:</strong> {medicalId.bloodGroup || 'Not set'}</p>
          <p><strong>Allergies:</strong> {medicalId.allergies || 'Not set'}</p>
          <p><strong>Current Medications:</strong> {medicalId.currentMedications || 'Not set'}</p>
          <p><strong>Health Conditions:</strong> {medicalId.healthConditions || 'Not set'}</p>
        </CardContent>
      </Card>

      <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingContact ? 'Edit' : 'Add'} Emergency Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="contact-phone">Phone</Label>
              <Input id="contact-phone" type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="contact-relationship">Relationship</Label>
              <Input id="contact-relationship" value={contactForm.relationship} onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveContact}>Save Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMedicalIdFormOpen} onOpenChange={setIsMedicalIdFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medical ID</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input id="bloodGroup" value={medicalId.bloodGroup} onChange={(e) => setMedicalId({ ...medicalId, bloodGroup: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea id="allergies" value={medicalId.allergies} onChange={(e) => setMedicalId({ ...medicalId, allergies: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea id="currentMedications" value={medicalId.currentMedications} onChange={(e) => setMedicalId({ ...medicalId, currentMedications: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="healthConditions">Health Conditions</Label>
              <Textarea id="healthConditions" value={medicalId.healthConditions} onChange={(e) => setMedicalId({ ...medicalId, healthConditions: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMedicalIdFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveMedicalId}>Save Medical ID</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isQrCodeDialogOpen} onOpenChange={setIsQrCodeDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
                <DialogTitle>Medical ID QR Code</DialogTitle>
                <DialogDescription>
                    Paramedics can scan this QR code to quickly access your medical information.
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center items-center p-4">
              <img  alt="Medical ID QR Code" src="https://images.unsplash.com/photo-1665292591084-e8524e64f918" />
            </div>
             <DialogFooter>
                <Button onClick={() => setIsQrCodeDialogOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    </div>
  );
};

export default EmergencyPage;