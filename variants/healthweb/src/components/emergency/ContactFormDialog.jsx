import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

const ContactFormDialog = ({ isOpen, onOpenChange, onSave, initialData, dialogTitle }) => {
  const defaultContactState = {
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  };

  const [contactData, setContactData] = useState(initialData || defaultContactState);

  useEffect(() => {
    setContactData(initialData || defaultContactState);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContactData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!contactData.name || !contactData.phone) {
      alert("Name and Phone Number are required.");
      return;
    }
    onSave(contactData);
    onOpenChange(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setContactData(defaultContactState); 
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{dialogTitle}</DialogTitle>
          <DialogDescription>
            Please fill in the details for the emergency contact.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={contactData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              aria-required="true"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Input 
              id="relationship" 
              value={contactData.relationship}
              onChange={handleChange}
              placeholder="e.g., Family, Doctor, Neighbor"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              value={contactData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              aria-required="true"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input 
              id="email" 
              type="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input 
              id="address" 
              value={contactData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input 
              id="notes" 
              value={contactData.notes}
              onChange={handleChange}
              placeholder="Any additional information"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;