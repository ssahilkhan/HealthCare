import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('appointments') 
          .select('*')
          .order('date_time', { ascending: true });

        if (error) throw error;
        setAppointments(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching appointments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const addAppointment = async (appointmentData) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select();

      if (error) throw error;
      if (data) {
        setAppointments(prev => [...prev, ...data].sort((a, b) => new Date(a.date_time) - new Date(b.date_time)));
      }
      return data ? data[0] : null;
    } catch (err) {
      setError(err.message);
      console.error("Error adding appointment:", err);
      return null;
    }
  };

  const updateAppointment = async (id, updatedData) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updatedData)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        setAppointments(prev => prev.map(appt => appt.id === id ? data[0] : appt).sort((a, b) => new Date(a.date_time) - new Date(b.date_time)));
      }
      return data ? data[0] : null;
    } catch (err) {
      setError(err.message);
      console.error("Error updating appointment:", err);
      return null;
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAppointments(prev => prev.filter(appt => appt.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting appointment:", err);
      return false;
    }
  };

  return { appointments, isLoading, error, addAppointment, updateAppointment, deleteAppointment };
};