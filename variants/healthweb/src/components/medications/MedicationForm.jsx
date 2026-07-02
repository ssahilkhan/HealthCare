import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clock, X, Pill, Syringe, SprayCan, EyeOff as EyeDropper } from 'lucide-react';

const medicationTypes = [
  { value: 'pill', label: 'Pill/Tablet', icon: <Pill className="h-5 w-5 mr-2" /> },
  { value: 'capsule', label: 'Capsule', icon: <Pill className="h-5 w-5 mr-2" /> },
  { value: 'liquid', label: 'Liquid/Syrup', icon: <Syringe className="h-5 w-5 mr-2" /> }, // Placeholder, better icon needed
  { value: 'injection', label: 'Injection', icon: <Syringe className="h-5 w-5 mr-2" /> },
  { value: 'inhaler', label: 'Inhaler/Spray', icon: <SprayCan className="h-5 w-5 mr-2" /> },
  { value: 'drops', label: 'Drops', icon: <EyeDropper className="h-5 w-5 mr-2" /> },
  { value: 'other', label: 'Other', icon: <Pill className="h-5 w-5 mr-2" /> },
];

const MedicationForm = ({ initialData, onSave, onCancel }) => {
  const defaultState = {
    name: '',
    dosage: '',
    instructions: '',
    type: 'pill',
    schedule: [] 
  };
  const [medication, setMedication] = useState(initialData || defaultState);
  const [scheduleTime, setScheduleTime] = useState('08:00');

  useEffect(() => {
    if (initialData) {
      setMedication({ ...defaultState, ...initialData, schedule: initialData.schedule || [] });
    } else {
      setMedication(defaultState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMedication(prev => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (type) => {
    setMedication(prev => ({ ...prev, type }));
  };

  const addTimeToSchedule = () => {
    if (scheduleTime && !medication.schedule.includes(scheduleTime)) {
      setMedication(prev => ({
        ...prev,
        schedule: [...prev.schedule, scheduleTime].sort()
      }));
    }
    setScheduleTime('08:00'); // Reset for next input
  };

  const removeTimeFromSchedule = (timeToRemove) => {
    setMedication(prev => ({
      ...prev,
      schedule: prev.schedule.filter(time => time !== timeToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medication.name || !medication.dosage) {
      alert("Medication Name and Dosage are required.");
      return;
    }
    onSave(medication);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg">Medication Name</Label>
        <Input 
          id="name" 
          value={medication.name}
          onChange={handleChange}
          placeholder="e.g., Lisinopril"
          className="text-lg py-3 px-4"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dosage" className="text-lg">Dosage</Label>
        <Input 
          id="dosage" 
          value={medication.dosage}
          onChange={handleChange}
          placeholder="e.g., 10mg, 1 tablet, 5ml"
          className="text-lg py-3 px-4"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type" className="text-lg">Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {medicationTypes.map(typeOpt => (
            <Button
              key={typeOpt.value}
              type="button"
              variant={medication.type === typeOpt.value ? "default" : "outline"}
              onClick={() => handleTypeChange(typeOpt.value)}
              className={`flex items-center justify-start text-left h-auto py-3 px-4 text-base ${medication.type === typeOpt.value ? 'bg-primary text-primary-foreground' : 'border-gray-300'}`}
            >
              {typeOpt.icon}
              {typeOpt.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instructions" className="text-lg">Instructions (Optional)</Label>
        <Input 
          id="instructions" 
          value={medication.instructions}
          onChange={handleChange}
          placeholder="e.g., Take with food, Before bedtime"
          className="text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-lg">Schedule (Optional)</Label>
        <div className="flex gap-2 items-center">
          <Input 
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="flex-1 text-lg py-3 px-4"
          />
          <Button 
            type="button" 
            onClick={addTimeToSchedule}
            variant="outline"
            className="text-lg py-3 px-4 border-primary text-primary hover:bg-primary/10"
          >
            Add Time
          </Button>
        </div>
        
        {medication.schedule.length > 0 && (
          <div className="mt-4">
            <Label className="text-base">Scheduled Times:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {medication.schedule.map((time) => (
                <div 
                  key={time} 
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-base"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  <button 
                    type="button"
                    onClick={() => removeTimeFromSchedule(time)}
                    className="ml-2 text-blue-800 hover:text-blue-900"
                    aria-label={`Remove time ${time}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="text-lg px-6 py-3">
          Cancel
        </Button>
        <Button type="submit" className="text-lg px-6 py-3 bg-primary hover:bg-primary/90">
          Save Medication
        </Button>
      </div>
    </form>
  );
};

export default MedicationForm;