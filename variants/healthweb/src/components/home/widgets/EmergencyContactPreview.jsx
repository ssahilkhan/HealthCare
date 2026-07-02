import React from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EmergencyContactPreview = ({ contact }) => {
  return (
    <li className="flex justify-between items-center py-2 border-b last:border-b-0">
      <div>
        <h3 className="font-semibold text-gray-800">{contact.name}</h3>
        <p className="text-sm text-gray-600">{contact.relationship}</p>
      </div>
      <a 
        href={`tel:${contact.phone}`}
        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
        aria-label={`Call ${contact.name}`}
      >
        <Phone className="h-5 w-5" />
      </a>
    </li>
  );
};

export default EmergencyContactPreview;