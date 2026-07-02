import React, { useState, useCallback } from 'react';

export const useMedicationDialogs = (addMedication, updateMedication) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    instructions: '',
    schedule: []
  });
  const [editingMedication, setEditingMedication] = useState(null);
  const [scheduleTime, setScheduleTime] = useState('08:00');

  const resetForm = useCallback(() => {
    setNewMedication({
      name: '',
      dosage: '',
      instructions: '',
      schedule: []
    });
    setScheduleTime('08:00');
  }, []);

  const openAddDialog = useCallback(() => {
    resetForm();
    setIsAddDialogOpen(true);
  }, [resetForm]);

  const openEditDialog = useCallback((medication) => {
    setEditingMedication({
      ...medication,
      schedule: medication.schedule || []
    });
    setIsEditDialogOpen(true);
  }, []);

  const addTimeToSchedule = useCallback((medType, time) => {
    if (medType === 'new') {
      if (!newMedication.schedule.includes(time)) {
        setNewMedication(prev => ({
          ...prev,
          schedule: [...prev.schedule, time].sort()
        }));
      }
    } else {
      if (editingMedication && !editingMedication.schedule.includes(time)) {
        setEditingMedication(prev => ({
          ...prev,
          schedule: [...prev.schedule, time].sort()
        }));
      }
    }
    setScheduleTime('08:00');
  }, [newMedication, editingMedication]);

  const removeTimeFromSchedule = useCallback((medType, timeToRemove) => {
    if (medType === 'new') {
      setNewMedication(prev => ({
        ...prev,
        schedule: prev.schedule.filter(time => time !== timeToRemove)
      }));
    } else {
      if (editingMedication) {
        setEditingMedication(prev => ({
          ...prev,
          schedule: prev.schedule.filter(time => time !== timeToRemove)
        }));
      }
    }
  }, [editingMedication]);

  const handleAddMedication = useCallback(() => {
    if (!newMedication.name) return;
    addMedication(newMedication);
    setIsAddDialogOpen(false);
    resetForm();
  }, [newMedication, addMedication, resetForm]);

  const handleUpdateMedication = useCallback(() => {
    if (!editingMedication || !editingMedication.name) return;
    updateMedication(editingMedication.id, editingMedication);
    setIsEditDialogOpen(false);
    setEditingMedication(null);
  }, [editingMedication, updateMedication]);

  const handleNewMedicationChange = useCallback((e) => {
    const { id, value } = e.target;
    setNewMedication(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleEditingMedicationChange = useCallback((e) => {
    const { id, value } = e.target;
    setEditingMedication(prev => ({ ...prev, [id]: value }));
  }, []);


  return {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    newMedication,
    setNewMedication: handleNewMedicationChange, 
    editingMedication,
    setEditingMedication: handleEditingMedicationChange,
    scheduleTime,
    setScheduleTime,
    openAddDialog,
    openEditDialog,
    addTimeToSchedule,
    removeTimeFromSchedule,
    handleAddMedication,
    handleUpdateMedication,
  };
};