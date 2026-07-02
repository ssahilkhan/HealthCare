import React, { useState } from 'react';
import { 
  Phone, 
  Plus, 
  Heart, 
  AlertTriangle,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import ContactCard from '@/components/emergency/ContactCard';
import EmptyState from '@/components/emergency/EmptyState';
import EmergencyServiceButton from '@/components/emergency/EmergencyServiceButton';
import ContactFormDialog from '@/components/emergency/ContactFormDialog';

const EmergencyContactsPage = () => {
  const { contacts, isLoading, addContact, updateContact, deleteContact } = useEmergencyContacts();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  
  const openAddDialog = () => {
    setEditingContact(null);
    setIsFormDialogOpen(true);
  };
  
  const openEditDialog = (contact) => {
    setEditingContact(contact);
    setIsFormDialogOpen(true);
  };
  
  const handleSaveContact = (contactData) => {
    if (editingContact && editingContact.id) {
      updateContact(editingContact.id, contactData);
    } else {
      addContact(contactData);
    }
    setIsFormDialogOpen(false);
    setEditingContact(null);
  };
  
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Phone className="mr-2 h-8 w-8 text-primary" />
            Emergency Contacts
          </h1>
          <p className="text-gray-600 mt-1">
            Add important contacts for quick access during emergencies
          </p>
        </div>
        
        <Button 
          onClick={openAddDialog}
          className="flex items-center"
          size="lg"
          aria-label="Add new emergency contact"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Contact
        </Button>
      </header>
      
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-700">Emergency Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EmergencyServiceButton 
              number="911" 
              label="Emergency" 
              icon={<AlertTriangle className="h-5 w-5" />} 
              color="bg-red-600"
            />
            <EmergencyServiceButton 
              number="211" 
              label="Health & Human Services" 
              icon={<Heart className="h-5 w-5" />} 
              color="bg-blue-600"
            />
            <EmergencyServiceButton 
              number="311" 
              label="Non-Emergency" 
              icon={<MessageCircle className="h-5 w-5" />} 
              color="bg-green-600"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Contacts</h2>
        
        {isLoading && <p>Loading contacts...</p>}
        {!isLoading && contacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <ContactCard 
                key={contact.id}
                contact={contact}
                onEdit={openEditDialog}
                onDelete={deleteContact}
              />
            ))}
          </div>
        ) : null}
        {!isLoading && contacts.length === 0 && (
          <EmptyState 
            onAdd={openAddDialog}
          />
        )}
      </div>
      
      <ContactFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSave={handleSaveContact}
        initialData={editingContact}
        dialogTitle={editingContact ? "Edit Contact" : "Add New Contact"}
      />
    </div>
  );
};

export default EmergencyContactsPage;