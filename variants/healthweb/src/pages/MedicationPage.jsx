import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Plus, 
  Clock, 
  Check, 
  Trash2, 
  Edit, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useMedications } from '@/hooks/useMedications';
import { useMedicationDialogs } from '@/hooks/useMedicationDialogs';

const MedicationPage = () => {
  const { medications, addMedication, updateMedication, deleteMedication, markMedicationAsTaken } = useMedications();
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    newMedication,
    setNewMedication,
    editingMedication,
    setEditingMedication,
    scheduleTime,
    setScheduleTime,
    openAddDialog,
    openEditDialog,
    addTimeToSchedule,
    removeTimeFromSchedule,
    handleAddMedication,
    handleUpdateMedication,
  } = useMedicationDialogs(addMedication, updateMedication);
  
  const [activeTab, setActiveTab] = useState('all');
  
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  const filteredMedications = () => {
    if (activeTab === 'all') {
      return medications;
    }
    const now = new Date();
    const today = now.toDateString();
    if (activeTab === 'today') {
      return medications.filter(med => {
        if (!med.schedule || !med.schedule.length) return false;
        return med.schedule.some(() => {
          if (med.lastTaken) {
            const lastTakenDate = new Date(med.lastTaken);
            if (lastTakenDate.toDateString() === today) {
              return false; 
            }
          }
          return true;
        });
      });
    }
    return medications;
  };
  
  const wasTakenToday = (medication) => {
    if (!medication.lastTaken) return false;
    const lastTakenDate = new Date(medication.lastTaken);
    const today = new Date();
    return lastTakenDate.toDateString() === today.toDateString();
  };
  
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Pill className="mr-2 h-8 w-8 text-primary" />
            Medications
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your medications and set reminders
          </p>
        </div>
        
        <Button 
          onClick={openAddDialog}
          className="flex items-center"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Medication
        </Button>
      </header>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="all" className="text-lg">All Medications</TabsTrigger>
          <TabsTrigger value="today" className="text-lg">Today's Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {medications.length > 0 ? (
            medications.map((medication) => (
              <MedicationCard 
                key={medication.id}
                medication={medication}
                onEdit={() => openEditDialog(medication)}
                onDelete={deleteMedication}
                onMarkTaken={markMedicationAsTaken}
                wasTakenToday={wasTakenToday(medication)}
                formatTime={formatTime}
              />
            ))
          ) : (
            <EmptyState 
              title="No medications added yet"
              description="Add your first medication to get started with reminders"
              onAdd={openAddDialog}
            />
          )}
        </TabsContent>
        
        <TabsContent value="today" className="space-y-4">
          {filteredMedications().length > 0 ? (
            filteredMedications().map((medication) => (
              <MedicationCard 
                key={medication.id}
                medication={medication}
                onEdit={() => openEditDialog(medication)}
                onDelete={deleteMedication}
                onMarkTaken={markMedicationAsTaken}
                wasTakenToday={wasTakenToday(medication)}
                formatTime={formatTime}
              />
            ))
          ) : (
            <EmptyState 
              title="No medications scheduled for today"
              description="All your medications for today have been taken or none are scheduled"
              onAdd={openAddDialog}
            />
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Medication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input id="name" value={newMedication.name} onChange={setNewMedication} placeholder="Enter medication name"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" value={newMedication.dosage} onChange={setNewMedication} placeholder="e.g., 1 tablet, 5ml, etc."/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Input id="instructions" value={newMedication.instructions} onChange={setNewMedication} placeholder="e.g., Take with food"/>
            </div>
            <div className="space-y-2">
              <Label>Schedule</Label>
              <div className="flex gap-2">
                <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="flex-1"/>
                <Button type="button" onClick={() => addTimeToSchedule('new', scheduleTime)}>Add Time</Button>
              </div>
              {newMedication.schedule.length > 0 && (
                <div className="mt-4">
                  <Label>Scheduled Times:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newMedication.schedule.map((time) => (
                      <div key={time} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(time)}
                        <button type="button" onClick={() => removeTimeFromSchedule('new', time)} className="ml-2 text-blue-800 hover:text-blue-900">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMedication}>Add Medication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {editingMedication && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Medication Name</Label>
                <Input id="name" value={editingMedication.name} onChange={setEditingMedication}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dosage">Dosage</Label>
                <Input id="dosage" value={editingMedication.dosage} onChange={setEditingMedication}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-instructions">Instructions</Label>
                <Input id="instructions" value={editingMedication.instructions} onChange={setEditingMedication}/>
              </div>
              <div className="space-y-2">
                <Label>Schedule</Label>
                <div className="flex gap-2">
                  <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="flex-1"/>
                  <Button type="button" onClick={() => addTimeToSchedule('edit', scheduleTime)}>Add Time</Button>
                </div>
                {editingMedication.schedule.length > 0 && (
                  <div className="mt-4">
                    <Label>Scheduled Times:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editingMedication.schedule.map((time) => (
                        <div key={time} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(time)}
                          <button type="button" onClick={() => removeTimeFromSchedule('edit', time)} className="ml-2 text-blue-800 hover:text-blue-900">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateMedication}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const MedicationCard = ({ medication, onEdit, onDelete, onMarkTaken, wasTakenToday, formatTime }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden ${wasTakenToday ? 'border-green-500 bg-green-50' : ''}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold">{medication.name}</h3>
                {wasTakenToday && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Taken today
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1">{medication.dosage}</p>
              {medication.instructions && (
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Instructions:</span> {medication.instructions}
                </p>
              )}
              {medication.schedule && medication.schedule.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {medication.schedule.map((time) => (
                    <div key={time} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTime(time)}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!wasTakenToday && (
                <Button 
                  onClick={() => onMarkTaken(medication.id)}
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Mark as Taken
                </Button>
              )}
              <Button onClick={() => onEdit(medication)} variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Medication</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {medication.name}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(medication.id)} className="bg-red-500 hover:bg-red-600">
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

const EmptyState = ({ title, description, onAdd }) => {
  return (
    <Card className="bg-blue-50 border-dashed border-blue-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Pill className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <CardTitle className="text-xl text-blue-700 mb-2">{title}</CardTitle>
        <p className="text-blue-600 mb-6">{description}</p>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicationPage;