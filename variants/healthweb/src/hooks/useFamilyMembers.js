import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useFamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('family_members') 
          .select('*');

        if (error) throw error;
        setFamilyMembers(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching family members:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamilyMembers();
  }, []);

  const addFamilyMember = async (memberData) => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .insert([memberData])
        .select();

      if (error) throw error;
      if (data) {
         setFamilyMembers(prev => [...prev, ...data]);
      }
      return data ? data[0] : null;
    } catch (err) {
      setError(err.message);
      console.error("Error adding family member:", err);
      return null;
    }
  };

  const updateFamilyMember = async (id, updatedData) => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .update(updatedData)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        setFamilyMembers(prev => prev.map(member => member.id === id ? data[0] : member));
      }
      return data ? data[0] : null;
    } catch (err) {
      setError(err.message);
      console.error("Error updating family member:", err);
      return null;
    }
  };

  const deleteFamilyMember = async (id) => {
    try {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFamilyMembers(prev => prev.filter(member => member.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting family member:", err);
      return false;
    }
  };


  return { familyMembers, isLoading, error, addFamilyMember, updateFamilyMember, deleteFamilyMember };
};