import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MedicationPage from '@/pages/MedicationPage';
import EmergencyContactsPage from '@/pages/EmergencyContactsPage';
import CommunityPage from '@/pages/CommunityPage';
import SettingsPage from '@/pages/SettingsPage';
import NutritionPage from '@/pages/NutritionPage.jsx';
import WellnessPage from '@/pages/WellnessPage.jsx';
import FamilyPage from '@/pages/FamilyPage.jsx';
import MentalWellnessPage from '@/pages/MentalWellnessPage.jsx';
import HelpPage from '@/pages/HelpPage.jsx';
import AppointmentsPage from '@/pages/AppointmentsPage.jsx';
import HealthJournalPage from '@/pages/HealthJournalPage.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="medications" element={<MedicationPage />} />
          <Route path="emergency-contacts" element={<EmergencyContactsPage />} />
          <Route path="health-journal" element={<HealthJournalPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="nutrition" element={<NutritionPage />} />
          <Route path="wellness" element={<WellnessPage />} />
          <Route path="mental-wellness" element={<MentalWellnessPage />} />
          <Route path="family-network" element={<FamilyPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;