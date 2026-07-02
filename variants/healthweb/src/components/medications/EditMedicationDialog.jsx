import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MedicationForm from '@/components/medications/MedicationForm';

const EditMedicationDialog = ({ isOpen, onOpenChange, medication, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary">Edit Medication</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Update the details for {medication?.name || 'this medication'}.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <MedicationForm 
            initialData={medication}
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

export default EditMedicationDialog;