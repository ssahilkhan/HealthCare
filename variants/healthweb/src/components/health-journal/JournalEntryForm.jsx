import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Smile, AlertCircle, Activity } from 'lucide-react';

const moodOptions = [
  { label: "Happy", icon: <Smile className="text-green-500 h-6 w-6" />, value: "happy" },
  { label: "Neutral", icon: <Smile className="text-yellow-500 h-6 w-6 opacity-50" />, value: "neutral" },
  { label: "Sad", icon: <Smile className="text-red-500 h-6 w-6 transform scale-y-[-1]" />, value: "sad" },
  { label: "Anxious", icon: <AlertCircle className="text-orange-500 h-6 w-6" />, value: "anxious" },
  { label: "Tired", icon: <Activity className="text-blue-500 h-6 w-6 opacity-70" />, value: "tired" },
];

const JournalEntryForm = ({ isOpen, onOpenChange, currentEntry, onInputChange, onMoodChange, onPainLevelChange, onSubmit, editingEntry }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{editingEntry ? 'Edit' : 'Add New'} Health Entry</DialogTitle>
          <DialogDescription>Log your health metrics for today.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={currentEntry.date} onChange={onInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="blood_pressure_systolic">Systolic BP (mmHg)</Label>
              <Input id="blood_pressure_systolic" type="number" value={currentEntry.blood_pressure_systolic} onChange={onInputChange} placeholder="e.g., 120" />
            </div>
            <div>
              <Label htmlFor="blood_pressure_diastolic">Diastolic BP (mmHg)</Label>
              <Input id="blood_pressure_diastolic" type="number" value={currentEntry.blood_pressure_diastolic} onChange={onInputChange} placeholder="e.g., 80" />
            </div>
          </div>
          <div>
            <Label htmlFor="blood_sugar">Blood Sugar (mg/dL)</Label>
            <Input id="blood_sugar" type="number" value={currentEntry.blood_sugar} onChange={onInputChange} placeholder="e.g., 100" />
          </div>
          <div>
            <Label htmlFor="temperature">Temperature (°F)</Label>
            <Input id="temperature" type="number" step="0.1" value={currentEntry.temperature} onChange={onInputChange} placeholder="e.g., 98.6" />
          </div>
           <div>
            <Label>Mood</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {moodOptions.map(mood => (
                <Button 
                  key={mood.value} 
                  variant={currentEntry.mood === mood.value ? 'default' : 'outline'}
                  onClick={() => onMoodChange(mood.value)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 h-auto"
                  aria-pressed={currentEntry.mood === mood.value}
                >
                  {mood.icon} {mood.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="pain_level">Pain Level (0-10)</Label>
            <div className="flex items-center gap-2">
              <Input id="pain_level" type="range" min="0" max="10" value={currentEntry.pain_level} onChange={onPainLevelChange} className="flex-grow" />
              <span className="w-8 text-center">{currentEntry.pain_level}</span>
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" value={currentEntry.notes} onChange={onInputChange} placeholder="Any symptoms, feelings, or observations..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>{editingEntry ? 'Save Changes' : 'Add Entry'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEntryForm;