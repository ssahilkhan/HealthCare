import React from 'react';
import { Pill, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom'; // Assuming onAdd might navigate or open a dialog

const EmptyMedicationState = ({ title, description, onAdd }) => {
  const handleAddClick = onAdd || (() => {}); // Default to no-op if onAdd is not provided

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 border-2 border-dashed border-gray-300 shadow-none">
      <CardContent className="p-8 text-center flex flex-col items-center">
        <div className="bg-gradient-to-r from-blue-200 to-green-200 p-4 rounded-full mb-6 shadow-md">
          <Pill className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl text-gray-700 mb-3">{title}</CardTitle>
        <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">{description}</p>
        {onAdd ? (
          <Button 
            onClick={handleAddClick} 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg px-8 py-3"
            aria-label="Add new medication"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Medication
          </Button>
        ) : (
          <Link to="/medications">
             <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg px-8 py-3"
              aria-label="Go to add medication page"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Medication
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyMedicationState;