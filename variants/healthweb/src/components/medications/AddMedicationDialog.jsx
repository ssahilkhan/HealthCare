import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MedicationForm from '@/components/medications/MedicationForm';

const AddMedicationDialog = ({ isOpen, onOpenChange, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary">Add New Medication</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Fill in the details for your new medication. You can add schedule times later if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <MedicationForm 
            onSave={(data) => {
              onSave(data);
              onOpenChange(false);
            }} 
            onCancel={() => onOpenChange(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicationDialog;