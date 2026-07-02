
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Plus, 
  User, 
  Heart, 
  Trash2, 
  Edit, 
  AlertTriangle,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const EmergencyContactsPage = () => {
  const { contacts, addContact, updateContact, deleteContact } = useEmergencyContacts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [editingContact, setEditingContact] = useState(null);
  
  // Reset form when dialog closes
  const resetForm = () => {
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    });
  };
  
  // Open edit dialog with contact data
  const openEditDialog = (contact) => {
    setEditingContact({...contact});
    setIsEditDialogOpen(true);
  };
  
  // Handle form submission for adding contact
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    
    addContact(newContact);
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  // Handle form submission for editing contact
  const handleUpdateContact = () => {
    if (!editingContact.name || !editingContact.phone) return;
    
    updateContact(editingContact.id, editingContact);
    setIsEditDialogOpen(false);
    setEditingContact(null);
  };
  
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Get avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    // Simple hash function to get consistent color for the same name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
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
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Contact
        </Button>
      </header>
      
      {/* Emergency Services Card */}
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
      
      {/* Contacts List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Contacts</h2>
        
        {contacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <ContactCard 
                key={contact.id}
                contact={contact}
                onEdit={openEditDialog}
                onDelete={deleteContact}
                getInitials={getInitials}
                getAvatarColor={getAvatarColor}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            onAdd={() => setIsAddDialogOpen(true)}
          />
        )}
      </div>
      
      {/* Add Contact Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Contact</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input 
                id="relationship" 
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                placeholder="e.g., Family, Doctor, Neighbor"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input 
                id="email" 
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input 
                id="address" 
                value={newContact.address}
                onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                placeholder="Enter address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input 
                id="notes" 
                value={newContact.notes}
                onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                placeholder="Any additional information"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContact}>
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Contact Dialog */}
      {editingContact && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Contact</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({...editingContact, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-relationship">Relationship</Label>
                <Input 
                  id="edit-relationship" 
                  value={editingContact.relationship}
                  onChange={(e) => setEditingContact({...editingContact, relationship: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input 
                  id="edit-phone" 
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({...editingContact, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({...editingContact, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input 
                  id="edit-address" 
                  value={editingContact.address}
                  onChange={(e) => setEditingContact({...editingContact, address: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input 
                  id="edit-notes" 
                  value={editingContact.notes}
                  onChange={(e) => setEditingContact({...editingContact, notes: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateContact}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Emergency Service Button Component
const EmergencyServiceButton = ({ number, label, icon, color }) => {
  return (
    <a 
      href={`tel:${number}`}
      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`${color} text-white p-3 rounded-full mr-3`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold">{number}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </a>
  );
};

// Contact Card Component
const ContactCard = ({ contact, onEdit, onDelete, getInitials, getAvatarColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className={`h-14 w-14 ${getAvatarColor(contact.name)}`}>
              <AvatarFallback className="text-white text-lg">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              {contact.relationship && (
                <p className="text-gray-600">{contact.relationship}</p>
              )}
              
              <div className="mt-3 space-y-1">
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center text-primary hover:underline"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </a>
                
                {contact.email && (
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center text-gray-600 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {contact.email}
                  </a>
                )}
              </div>
              
              {contact.notes && (
                <p className="mt-2 text-gray-600 text-sm">
                  <span className="font-medium">Notes:</span> {contact.notes}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => onEdit(contact)}
                variant="outline"
                size="icon"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {contact.name} from your emergency contacts? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(contact.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <a 
                href={`tel:${contact.phone}`}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md flex items-center justify-center"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ onAdd }) => {
  return (
    <Card className="bg-blue-50 border-dashed border-blue-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <h3 className="text-xl text-blue-700 mb-2">No contacts added yet</h3>
        <p className="text-blue-600 mb-6">
          Add important contacts for quick access during emergencies
        </p>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsPage;
