import React from 'react';
import { motion } from 'framer-motion';
import { Database, Download, Upload, Trash2, LogOut, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { clearLocalStorage } from '@/lib/localStorage'; // Assuming this exists

const DataManagementSettings = () => {
  const { toast } = useToast();

  const handleBackupData = () => {
    // Placeholder for backup logic (e.g., generate JSON and download)
    const dataToBackup = { message: "This is a placeholder for user data backup." };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToBackup))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `carecompanion_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast({
      title: "Data Backup Started",
      description: "Your data is being prepared for download.",
      className: "bg-blue-500 text-white",
    });
  };

  const handleRestoreData = (event) => {
    // Placeholder for restore logic
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const restoredData = JSON.parse(e.target.result);
          console.log("Data to restore:", restoredData);
          // Here, you would process restoredData and update app state/Supabase
          toast({
            title: "Data Restore Successful",
            description: "Your data has been restored from the backup file.",
            className: "bg-green-500 text-white",
          });
        } catch (error) {
          toast({
            title: "Data Restore Failed",
            description: "The backup file is invalid or corrupted.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };
  
  const handleClearData = () => {
    clearLocalStorage(); // Example: clear local data
    // Add Supabase data clearing logic if needed, carefully
    toast({
      title: "All Data Cleared",
      description: "All your app data has been removed from this device.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    // Add Supabase sign out logic here
    // supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Redirect to login page or home
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-primary">
            <Database className="mr-2 h-6 w-6" />
            Data & Account Management
          </CardTitle>
          <CardDescription className="text-base">
            Manage your application data and account settings.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Backup and Restore */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-medium text-gray-700">Data Backup & Restore</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleBackupData} variant="outline" size="lg" className="text-lg py-3 border-blue-500 text-blue-600 hover:bg-blue-50">
                <Download className="mr-2 h-5 w-5" /> Backup My Data
              </Button>
              <div>
                <input type="file" id="restoreFile" accept=".json" onChange={handleRestoreData} className="hidden" />
                <Button onClick={() => document.getElementById('restoreFile').click()} variant="outline" size="lg" className="w-full text-lg py-3 border-green-500 text-green-600 hover:bg-green-50">
                  <Upload className="mr-2 h-5 w-5" /> Restore Data from Backup
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Regularly back up your data to prevent loss. Restoring will overwrite current data.
            </p>
          </div>

          {/* Account Actions */}
          <div className="space-y-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-lg font-medium text-red-700 flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" /> Account Actions (Use with Caution)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="lg" className="text-lg py-3 bg-red-600 hover:bg-red-700">
                    <Trash2 className="mr-2 h-5 w-5" /> Clear All App Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      This action will permanently delete all your data stored in this app (medications, contacts, logs, etc.) on this device. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-lg px-4 py-2">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData} className="bg-red-600 hover:bg-red-700 text-lg px-4 py-2">
                      Yes, Clear All Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button onClick={handleLogout} variant="outline" size="lg" className="text-lg py-3 border-gray-400 hover:bg-gray-100">
                <LogOut className="mr-2 h-5 w-5" /> Log Out
              </Button>
            </div>
            <p className="text-sm text-red-600 mt-2">
              Logging out will sign you out of your account. Clearing data is irreversible.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataManagementSettings;