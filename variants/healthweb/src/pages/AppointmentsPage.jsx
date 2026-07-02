import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Plus, Edit, Trash2, Clock, MapPin, FileText, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter as DialogFooterComponent, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppointments } from '@/hooks/useAppointments';
import { useToast } from '@/components/ui/use-toast';

const AppointmentsPage = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment, isLoading } = useAppointments();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    doctor_name: '',
    location: '',
    date_time: '',
    purpose: '',
    notes: '',
    reminder_enabled: false,
  });

  const handleOpenForm = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setNewAppointment({
        ...appointment,
        date_time: appointment.date_time ? new Date(appointment.date_time).toISOString().substring(0, 16) : ''
      });
    } else {
      setEditingAppointment(null);
      setNewAppointment({
        doctor_name: '',
        location: '',
        date_time: '',
        purpose: '',
        notes: '',
        reminder_enabled: false,
      });
    }
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!newAppointment.doctor_name || !newAppointment.date_time || !newAppointment.purpose) {
      toast({
        title: "Missing Information",
        description: "Doctor name, date/time, and purpose are required.",
        variant: "destructive",
      });
      return;
    }

    const appointmentData = {
      ...newAppointment,
      date_time: new Date(newAppointment.date_time).toISOString(),
    };

    if (editingAppointment) {
      await updateAppointment(editingAppointment.id, appointmentData);
      toast({ title: "Success", description: "Appointment updated successfully." });
    } else {
      await addAppointment(appointmentData);
      toast({ title: "Success", description: "Appointment added successfully." });
    }
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    toast({ title: "Success", description: "Appointment deleted successfully." });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <CalendarDays className="mr-3 h-8 w-8 text-primary" />
            Appointments
          </h1>
          <p className="text-gray-600 mt-1">Manage your doctor visits and important medical appointments.</p>
        </div>
        <Button onClick={() => handleOpenForm()} size="lg">
          <Plus className="mr-2 h-5 w-5" /> Add Appointment
        </Button>
      </header>

      {isLoading && <p className="text-center text-gray-500">Loading appointments...</p>}

      {!isLoading && appointments.length === 0 && (
        <Card className="text-center py-12 bg-gray-50">
          <CardContent>
            <CalendarDays className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments Yet</h3>
            <p className="text-gray-500 mb-6">Click "Add Appointment" to schedule your first visit.</p>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add Appointment
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && appointments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{appt.doctor_name}</CardTitle>
                  <p className="text-sm text-gray-500">{appt.purpose}</p>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{formatDate(appt.date_time)}</span>
                  </div>
                  {appt.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{appt.location}</span>
                    </div>
                  )}
                  {appt.notes && (
                    <div className="flex items-start text-sm">
                      <FileText className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <p className="break-words">{appt.notes}</p>
                    </div>
                  )}
                  {appt.reminder_enabled && (
                    <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-md">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Reminder Enabled</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenForm(appt)}>
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
                        <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the appointment with {appt.doctor_name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(appt.id)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{editingAppointment ? 'Edit' : 'Add New'} Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details for your medical appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <Label htmlFor="doctor_name">Doctor's Name</Label>
              <Input id="doctor_name" value={newAppointment.doctor_name} onChange={handleInputChange} placeholder="e.g., Dr. Smith" />
            </div>
            <div>
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input id="purpose" value={newAppointment.purpose} onChange={handleInputChange} placeholder="e.g., Annual Check-up, Follow-up" />
            </div>
            <div>
              <Label htmlFor="date_time">Date & Time</Label>
              <Input id="date_time" type="datetime-local" value={newAppointment.date_time} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="location">Location / Clinic</Label>
              <Input id="location" value={newAppointment.location} onChange={handleInputChange} placeholder="e.g., City General Hospital, Room 302" />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea id="notes" value={newAppointment.notes} onChange={handleInputChange} placeholder="e.g., Bring previous reports, Fasting required" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="reminder_enabled" checked={newAppointment.reminder_enabled} onCheckedChange={(checked) => setNewAppointment(prev => ({ ...prev, reminder_enabled: checked }))} />
              <Label htmlFor="reminder_enabled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enable SMS/Email Reminder (if available)
              </Label>
            </div>
          </div>
          <DialogFooterComponent>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingAppointment ? 'Save Changes' : 'Add Appointment'}</Button>
          </DialogFooterComponent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsPage;