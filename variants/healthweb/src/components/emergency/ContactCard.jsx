import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getAvatarColor = (name) => {
  if (!name) return 'bg-gray-500';
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full">
        <CardContent className="p-6 flex-grow">
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
                  aria-label={`Call ${contact.name} at ${contact.phone}`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </a>
                
                {contact.email && (
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center text-gray-600 hover:underline"
                    aria-label={`Email ${contact.name} at ${contact.email}`}
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-3">
          <a
            href={`tel:${contact.phone}`}
            className="w-full sm:flex-grow"
            aria-label={`Call ${contact.name.split(' ')[0]}`}
          >
            <Button variant="default" className="w-full bg-green-500 hover:bg-green-600">
              <Phone className="mr-2 h-5 w-5" /> Call {contact.name.split(' ')[0]}
            </Button>
          </a>
          <div className="flex gap-2 sm:ml-4">
            <Button 
              onClick={() => onEdit(contact)} 
              variant="outline" 
              size="icon"
              aria-label={`Edit contact ${contact.name}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  aria-label={`Delete contact ${contact.name}`}
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
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ContactCard;