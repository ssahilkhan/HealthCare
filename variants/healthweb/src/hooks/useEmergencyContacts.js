import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useEmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching contacts",
        description: error.message,
        variant: "destructive",
      });
      setContacts([]);
    } else {
      setContacts(data || []);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = async (contact) => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert([contact])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding contact",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } else {
      setContacts(prev => [data, ...prev]);
      toast({
        title: "Contact Added",
        description: `${data.name} has been added to your emergency contacts.`,
      });
      return data;
    }
  };

  const updateContact = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating contact",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setContacts(prev => prev.map(contact => (contact.id === id ? data : contact)));
      toast({
        title: "Contact Updated",
        description: "Your emergency contact has been updated successfully.",
      });
    }
  };

  const deleteContact = async (id) => {
    const contactToDelete = contacts.find(contact => contact.id === id);
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error removing contact",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setContacts(prev => prev.filter(contact => contact.id !== id));
      toast({
        title: "Contact Removed",
        description: contactToDelete
          ? `${contactToDelete.name} has been removed from your emergency contacts.`
          : "Contact has been removed.",
        variant: "destructive",
      });
    }
  };

  return {
    contacts,
    isLoading,
    addContact,
    updateContact,
    deleteContact,
    fetchContacts
  };
}