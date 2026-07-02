import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Thermometer, Activity, Smile, AlertCircle, StickyNote, Droplet, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';

const moodOptions = [
  { label: "Happy", icon: <Smile className="text-green-500 h-6 w-6" />, value: "happy" },
  { label: "Neutral", icon: <Smile className="text-yellow-500 h-6 w-6 opacity-50" />, value: "neutral" },
  { label: "Sad", icon: <Smile className="text-red-500 h-6 w-6 transform scale-y-[-1]" />, value: "sad" },
  { label: "Anxious", icon: <AlertCircle className="text-orange-500 h-6 w-6" />, value: "anxious" },
  { label: "Tired", icon: <Activity className="text-blue-500 h-6 w-6 opacity-70" />, value: "tired" },
];

const JournalEntryCard = ({ entry, onEdit, onDelete, formatDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary flex justify-between items-center">
            <span>Entry for: {formatDate(entry.date)}</span>
            <span className="text-base font-normal text-gray-600 flex items-center">
              {moodOptions.find(m => m.value === entry.mood)?.icon}
              <span className="ml-2 capitalize">{entry.mood}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {entry.blood_pressure_systolic && entry.blood_pressure_diastolic && (
            <div className="flex items-center"><HeartPulse className="mr-2 h-4 w-4 text-red-500" /> BP: {entry.blood_pressure_systolic}/{entry.blood_pressure_diastolic} mmHg</div>
          )}
          {entry.blood_sugar && (
            <div className="flex items-center"><Droplet className="mr-2 h-4 w-4 text-blue-500" /> Sugar: {entry.blood_sugar} mg/dL</div>
          )}
          {entry.temperature && (
            <div className="flex items-center"><Thermometer className="mr-2 h-4 w-4 text-orange-500" /> Temp: {entry.temperature} °F</div>
          )}
          {entry.pain_level > 0 && (
             <div className="flex items-center"><AlertCircle className="mr-2 h-4 w-4 text-yellow-600" /> Pain: {entry.pain_level}/10</div>
          )}
          {entry.notes && (
            <div className="flex items-start col-span-full mt-2">
              <StickyNote className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="break-words text-gray-700">{entry.notes}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(entry)}>
            <Edit className="mr-1 h-4 w-4" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Journal Entry</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this entry from {formatDate(entry.date)}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(entry.id)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JournalEntryCard;