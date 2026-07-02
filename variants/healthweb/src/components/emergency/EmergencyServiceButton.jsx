import React from 'react';
import { Button } from '@/components/ui/button';

const EmergencyServiceButton = ({ number, label, icon, color }) => {
  return (
    <a 
      href={`tel:${number}`}
      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Call ${label} at ${number}`}
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

export default EmergencyServiceButton;