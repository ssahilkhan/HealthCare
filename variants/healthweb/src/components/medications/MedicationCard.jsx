import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Clock, Check, Trash2, Edit, AlertTriangle, Syringe, SprayCan, EyeOff as EyeDropper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const MedicationIcon = ({ type, className }) => {
  const iconProps = { className: className || "h-5 w-5 mr-2" };
  switch (type?.toLowerCase()) {
    case 'pill':
    case 'tablet':
    case 'capsule':
      return <Pill {...iconProps} />;
    case 'injection':
    case 'syringe':
      return <Syringe {...iconProps} />;
    case 'inhaler':
    case 'spray':
      return <SprayCan {...iconProps} />;
    case 'drops':
      return <EyeDropper {...iconProps} />;
    default:
      return <Pill {...iconProps} />;
  }
};

const MedicationCard = ({ medication, onEdit, onDelete, onMarkTaken, formatTime, wasTakenTodayAtTime, isDue, showAllTimes }) => {
  const getRelevantScheduleTimes = () => {
    if (showAllTimes || !medication.schedule) return medication.schedule || [];
    // For "Today's Schedule", only show times that are due or not yet taken today.
    return medication.schedule.filter(time => isDue(medication, time) || !wasTakenTodayAtTime(medication, time));
  };

  const relevantScheduleTimes = getRelevantScheduleTimes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <MedicationIcon type={medication.type} className="h-7 w-7 mr-3 text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-700">{medication.name}</h3>
              </div>
              
              <p className="text-gray-700 text-lg mt-1">{medication.dosage}</p>
              
              {medication.instructions && (
                <p className="text-gray-600 mt-2 text-base">
                  <span className="font-medium">Instructions:</span> {medication.instructions}
                </p>
              )}
              
              {relevantScheduleTimes.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-md font-medium text-gray-700">Scheduled Times:</h4>
                  {relevantScheduleTimes.map((time) => {
                    const taken = wasTakenTodayAtTime(medication, time);
                    const due = isDue(medication, time);
                    return (
                      <div 
                        key={time} 
                        className={`flex items-center justify-between p-3 rounded-lg text-base
                                    ${taken ? 'bg-green-100 text-green-800' : 
                                     due ? 'bg-red-100 text-red-800 animate-pulse-gentle' : 
                                     'bg-blue-100 text-blue-800'}`}
                      >
                        <div className="flex items-center">
                          {taken ? <Check className="h-5 w-5 mr-2 text-green-600" /> : 
                           due ? <AlertTriangle className="h-5 w-5 mr-2 text-red-600" /> :
                           <Clock className="h-5 w-5 mr-2 text-blue-600" />}
                          <span className="font-medium">{formatTime(time)}</span>
                          {taken && <span className="ml-2 text-sm">(Taken)</span>}
                          {due && !taken && <span className="ml-2 text-sm font-semibold">(Due Now)</span>}
                        </div>
                        {!taken && (
                          <Button 
                            size="sm"
                            onClick={() => onMarkTaken(medication.id, time)}
                            variant={due ? "default" : "outline"}
                            className={due ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}
                            aria-label={`Mark ${medication.name} as taken at ${formatTime(time)}`}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Take
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-stretch gap-3 mt-4 md:mt-0 shrink-0">
              <Button 
                onClick={() => onEdit(medication)}
                variant="outline"
                className="w-full md:w-auto justify-start text-lg py-3 border-gray-400 hover:bg-gray-100"
                aria-label={`Edit ${medication.name}`}
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="w-full md:w-auto justify-start text-lg py-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                    aria-label={`Delete ${medication.name}`}
                  >
                    <Trash2 className="mr-2 h-5 w-5" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Delete Medication</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      Are you sure you want to delete {medication.name}? This action cannot be undone and will remove all its history.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-lg px-4 py-2">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(medication.id)}
                      className="bg-red-600 hover:bg-red-700 text-lg px-4 py-2"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MedicationCard;