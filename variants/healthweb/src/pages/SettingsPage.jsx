import React from 'react';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsTabs from '@/components/settings/SettingsTabs';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  );
};

export default SettingsPage;