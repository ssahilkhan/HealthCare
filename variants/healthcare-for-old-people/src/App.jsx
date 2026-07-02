
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MedicationPage from '@/pages/MedicationPage';
import EmergencyContactsPage from '@/pages/EmergencyContactsPage';
import CommunityPage from '@/pages/CommunityPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="medications" element={<MedicationPage />} />
          <Route path="emergency-contacts" element={<EmergencyContactsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
