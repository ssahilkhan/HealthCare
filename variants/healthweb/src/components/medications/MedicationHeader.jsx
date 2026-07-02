import React from 'react';
import { Pill, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MedicationHeader = ({ onAddMedication }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center text-primary">
          <Pill className="mr-3 h-8 w-8" />
          Medications
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Manage your medications and set reminders for easy tracking.
        </p>
      </div>
      
      <Button 
        onClick={onAddMedication}
        className="flex items-center bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        size="lg"
        aria-label="Add new medication"
      >
        <Plus className="mr-2 h-5 w-5" />
        Add Medication
      </Button>
    </header>
  );
};

export default MedicationHeader;