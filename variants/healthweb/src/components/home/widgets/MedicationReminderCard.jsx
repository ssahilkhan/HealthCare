import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MedicationReminderCard = ({ medication, onMarkTaken, formatTime }) => {
  const wasTakenToday = () => {
    if (!medication.lastTaken) return false;
    const lastTakenDate = new Date(medication.lastTaken);
    const today = new Date();
    return lastTakenDate.toDateString() === today.toDateString();
  };

  const isDue = () => {
    if (wasTakenToday()) return false;
    if (!medication.schedule || medication.schedule.length === 0) return false;
    
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    return medication.schedule.some(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const scheduledTimeInMinutes = hours * 60 + minutes;
      // Consider due if within the next 30 minutes or past due today
      return scheduledTimeInMinutes <= currentTimeInMinutes && scheduledTimeInMinutes >= currentTimeInMinutes - 1440; // 1440 minutes in a day
    });
  };
  
  const isCurrentlyDue = isDue();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <Card className={`border-l-4 ${isCurrentlyDue && !wasTakenToday() ? 'border-l-red-500 bg-red-50' : wasTakenToday() ? 'border-l-green-500 bg-green-50' : 'border-l-gray-300'}`}>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{medication.name}</h3>
            <p className="text-gray-600">{medication.dosage}</p>
            {medication.schedule && medication.schedule.length > 0 && (
              <div className={`flex items-center mt-1 ${isCurrentlyDue && !wasTakenToday() ? 'text-red-500' : 'text-gray-500'}`}>
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {isCurrentlyDue && !wasTakenToday() ? 'Due now' : `Scheduled: ${medication.schedule.map(t => formatTime(t)).join(', ')}`}
                </span>
              </div>
            )}
             {wasTakenToday() && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                    <Check className="h-4 w-4 mr-1"/> Taken Today
                </p>
            )}
          </div>
          {!wasTakenToday() && (
            <Button 
              onClick={() => onMarkTaken(medication.id)}
              className={`${isCurrentlyDue ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              disabled={wasTakenToday()}
            >
              <Check className="mr-1 h-4 w-4" />
              {isCurrentlyDue ? 'Take Now' : 'Mark Taken'}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MedicationReminderCard;