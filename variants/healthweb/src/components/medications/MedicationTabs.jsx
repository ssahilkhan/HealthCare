import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MedicationCard from '@/components/medications/MedicationCard';
import EmptyMedicationState from '@/components/medications/EmptyMedicationState';
import { useMedications } from '@/hooks/useMedications';

const MedicationTabs = ({ onEditMedication }) => {
  const { medications, isLoading, deleteMedication, markMedicationAsTaken } = useMedications();
  const [activeTab, setActiveTab] = useState('all');

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const wasTakenTodayAtTime = (medication, scheduleTime) => {
    if (!medication.history || medication.history.length === 0) return false;
    const today = new Date().toDateString();
    return medication.history.some(entry => {
      const entryDate = new Date(entry.date).toDateString();
      const entryTime = new Date(entry.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      return entry.taken && entryDate === today && entryTime === scheduleTime;
    });
  };
  
  const isDue = (medication, scheduleTime) => {
    const now = new Date();
    const [hours, minutes] = scheduleTime.split(':').map(Number);
    const scheduledDateTime = new Date(now);
    scheduledDateTime.setHours(hours, minutes, 0, 0);

    if (wasTakenTodayAtTime(medication, scheduleTime)) return false;

    const timeDiff = scheduledDateTime.getTime() - now.getTime();
    return timeDiff >= -15 * 60 * 1000 && timeDiff <= 30 * 60 * 1000; // Due if within -15min to +30min window
  };


  const filteredMedications = useMemo(() => {
    if (activeTab === 'all') {
      return medications;
    }
    
    // For 'today's schedule', we want to show medications that have scheduled times today
    // and haven't been fully taken for all those times.
    if (activeTab === 'today') {
      return medications.filter(med => {
        if (!med.schedule || med.schedule.length === 0) return false;
        // Check if any scheduled time for today is still pending or due
        return med.schedule.some(time => !wasTakenTodayAtTime(med, time) || isDue(med, time));
      });
    }
    return medications;
  }, [medications, activeTab]);

  if (isLoading) {
    return <p className="text-center text-gray-600 text-lg py-8">Loading medications...</p>;
  }

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="all" className="text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md">All Medications</TabsTrigger>
        <TabsTrigger value="today" className="text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md">Today's Schedule</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-6">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((medication) => (
            <MedicationCard 
              key={medication.id}
              medication={medication}
              onEdit={onEditMedication}
              onDelete={deleteMedication}
              onMarkTaken={markMedicationAsTaken}
              formatTime={formatTime}
              wasTakenTodayAtTime={wasTakenTodayAtTime}
              isDue={isDue}
              showAllTimes={true}
            />
          ))
        ) : (
          <EmptyMedicationState 
            title="No medications added yet"
            description="Add your first medication to get started with reminders."
          />
        )}
      </TabsContent>
      
      <TabsContent value="today" className="space-y-6">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((medication) => (
            <MedicationCard 
              key={medication.id}
              medication={medication}
              onEdit={onEditMedication}
              onDelete={deleteMedication}
              onMarkTaken={markMedicationAsTaken}
              formatTime={formatTime}
              wasTakenTodayAtTime={wasTakenTodayAtTime}
              isDue={isDue}
              showAllTimes={false} // Only show relevant times for today
            />
          ))
        ) : (
          <EmptyMedicationState 
            title="No medications scheduled for today or all taken"
            description="All your medications for today have been taken, or none are scheduled."
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default MedicationTabs;