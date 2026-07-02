import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AccessibilitySettings from '@/components/settings/AccessibilitySettings';
import DataManagementSettings from '@/components/settings/DataManagementSettings';
import HelpSupportSettings from '@/components/settings/HelpSupportSettings'; // Assuming this will be created for the Help tab

const SettingsTabs = () => {
  const tabItems = [
    { value: "profile", label: "Profile", component: <ProfileSettings /> },
    { value: "notifications", label: "Notifications", component: <NotificationSettings /> },
    { value: "accessibility", label: "Accessibility", component: <AccessibilitySettings /> },
    { value: "data", label: "Data", component: <DataManagementSettings /> },
    { value: "help", label: "Help & Support", component: <HelpSupportSettings /> },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
        {tabItems.map(tab => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabItems.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SettingsTabs;