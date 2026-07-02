import React from 'react';
import { Settings } from 'lucide-react';

const SettingsHeader = () => {
  return (
    <header>
      <h1 className="text-3xl font-bold flex items-center text-primary">
        <Settings className="mr-3 h-8 w-8" />
        Settings
      </h1>
      <p className="text-gray-600 mt-1 text-lg">
        Manage your account settings, preferences, and app behavior.
      </p>
    </header>
  );
};

export default SettingsHeader;