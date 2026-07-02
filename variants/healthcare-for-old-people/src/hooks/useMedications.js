import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useMedications() {
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMedications = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching medications",
        description: error.message,
        variant: "destructive",
      });
      setMedications([]);
    } else {
      setMedications(data || []);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const addMedication = async (medication) => {
    const { data, error } = await supabase
      .from('medications')
      .insert([{ ...medication, schedule: medication.schedule || [], history: medication.history || [] }])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding medication",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } else {
      setMedications(prev => [data, ...prev]);
      toast({
        title: "Medication Added",
        description: `${data.name} has been added to your medications.`,
      });
      return data;
    }
  };

  const updateMedication = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('medications')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating medication",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMedications(prev => prev.map(med => (med.id === id ? data : med)));
      toast({
        title: "Medication Updated",
        description: "Your medication has been updated successfully.",
      });
    }
  };

  const deleteMedication = async (id) => {
    const medicationToDelete = medications.find(med => med.id === id);
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error removing medication",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMedications(prev => prev.filter(med => med.id !== id));
      toast({
        title: "Medication Removed",
        description: medicationToDelete
          ? `${medicationToDelete.name} has been removed from your medications.`
          : "Medication has been removed.",
        variant: "destructive",
      });
    }
  };

  const markMedicationAsTaken = async (id) => {
    const medication = medications.find(med => med.id === id);
    if (!medication) return;

    const lastTaken = new Date().toISOString();
    const newHistoryEntry = { date: lastTaken, taken: true };
    const updatedHistory = [...(medication.history || []), newHistoryEntry];

    const { data, error } = await supabase
      .from('medications')
      .update({ last_taken: lastTaken, history: updatedHistory, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      toast({
        title: "Error marking medication as taken",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMedications(prev => prev.map(med => (med.id === id ? data : med)));
      toast({
        title: "Medication Taken",
        description: data
          ? `You've marked ${data.name} as taken.`
          : "Medication marked as taken.",
      });
    }
  };

  const getDueMedications = useCallback(() => {
    const now = new Date();
    return medications.filter(med => {
      if (!med.schedule || !med.schedule.length) return false;
      
      return med.schedule.some(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const scheduledTime = new Date(now);
        scheduledTime.setHours(hours, minutes, 0, 0);
        
        if (med.last_taken) {
          const lastTakenDate = new Date(med.last_taken);
          if (lastTakenDate.toDateString() === now.toDateString()) {
            const lastTakenTime = new Date(med.last_taken);
            lastTakenTime.setHours(hours, minutes, 0, 0);
             if (Math.abs(new Date(med.last_taken).getTime() - lastTakenTime.getTime()) < 30 * 60 * 1000) {
               return false; 
             }
          }
        }
        
        const timeDiff = scheduledTime.getTime() - now.getTime();
        return timeDiff >= 0 && timeDiff <= 30 * 60 * 1000; 
      });
    });
  }, [medications]);

  return {
    medications,
    isLoading,
    addMedication,
    updateMedication,
    deleteMedication,
    markMedicationAsTaken,
    getDueMedications,
    fetchMedications
  };
}