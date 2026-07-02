import React from 'react';
import { User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        <Button onClick={onAdd} aria-label="Add new contact">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;