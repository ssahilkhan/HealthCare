import { useState, useEffect } from 'react';
import { Laptop as NotebookText, Plus, Download } from 'lucide-react'; // Changed BookHeart to NotebookText
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient'; 
import JournalEntryCard from '@/components/health-journal/JournalEntryCard';
import JournalEntryForm from '@/components/health-journal/JournalEntryForm';

const HealthJournalPage = () => {
  const { toast } = useToast();
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    blood_sugar: '',
    temperature: '',
    mood: 'neutral',
    pain_level: '0', 
    notes: ''
  });

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('health_journal_entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Could not fetch journal entries.", variant: "destructive" });
      console.error("Error fetching entries:", error);
    } else {
      setJournalEntries(data || []);
    }
    setIsLoading(false);
  };

  const handleOpenForm = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setCurrentEntry({
        ...entry,
        date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    } else {
      setEditingEntry(null);
      setCurrentEntry({
        date: new Date().toISOString().split('T')[0],
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        blood_sugar: '',
        temperature: '',
        mood: 'neutral',
        pain_level: '0',
        notes: ''
      });
    }
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrentEntry(prev => ({ ...prev, [id]: value }));
  };
  
  const handleMoodChange = (moodValue) => {
    setCurrentEntry(prev => ({ ...prev, mood: moodValue }));
  };
  
  const handlePainLevelChange = (e) => {
    setCurrentEntry(prev => ({ ...prev, pain_level: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!currentEntry.date) {
      toast({ title: "Missing Date", description: "Please select a date for the entry.", variant: "destructive" });
      return;
    }

    const entryData = {
      ...currentEntry,
      blood_pressure_systolic: currentEntry.blood_pressure_systolic ? parseInt(currentEntry.blood_pressure_systolic) : null,
      blood_pressure_diastolic: currentEntry.blood_pressure_diastolic ? parseInt(currentEntry.blood_pressure_diastolic) : null,
      blood_sugar: currentEntry.blood_sugar ? parseInt(currentEntry.blood_sugar) : null,
      temperature: currentEntry.temperature ? parseFloat(currentEntry.temperature) : null,
      pain_level: currentEntry.pain_level ? parseInt(currentEntry.pain_level) : 0,
    };

    if (editingEntry) {
      const { data, error } = await supabase
        .from('health_journal_entries')
        .update(entryData)
        .eq('id', editingEntry.id)
        .select();
      if (error) {
        toast({ title: "Error", description: "Could not update entry.", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Journal entry updated." });
        setJournalEntries(prev => prev.map(e => e.id === editingEntry.id ? data[0] : e));
      }
    } else {
      const { data, error } = await supabase
        .from('health_journal_entries')
        .insert([entryData])
        .select();
      if (error) {
        toast({ title: "Error", description: "Could not add entry.", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "New journal entry added." });
        if (data) setJournalEntries(prev => [data[0], ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
      }
    }
    setIsFormOpen(false);
    setEditingEntry(null);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      blood_pressure_systolic: '',
      blood_pressure_diastolic: '',
      blood_sugar: '',
      temperature: '',
      mood: 'neutral',
      pain_level: '0',
      notes: ''
    });
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('health_journal_entries')
      .delete()
      .eq('id', id);
    if (error) {
      toast({ title: "Error", description: "Could not delete entry.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Journal entry deleted." });
      setJournalEntries(prev => prev.filter(e => e.id !== id));
    }
  };
  
  const downloadReport = () => {
    let reportContent = "Date,Systolic BP,Diastolic BP,Blood Sugar,Temperature,Mood,Pain Level,Notes\n";
    journalEntries.forEach(entry => {
      reportContent += `${entry.date},${entry.blood_pressure_systolic || ''},${entry.blood_pressure_diastolic || ''},${entry.blood_sugar || ''},${entry.temperature || ''},${entry.mood},${entry.pain_level},"${entry.notes || ''}"\n`;
    });
    const blob = new Blob([reportContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "health_journal_report.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
     toast({ title: "Report Downloaded", description: "Health journal report has been downloaded as CSV." });
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <NotebookText className="mr-3 h-8 w-8 text-primary" /> {/* Changed BookHeart to NotebookText */}
            Health Journal
          </h1>
          <p className="text-gray-600 mt-1">Track your daily health metrics and notes.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => handleOpenForm()} size="lg">
                <Plus className="mr-2 h-5 w-5" /> Add Entry
            </Button>
            <Button onClick={downloadReport} size="lg" variant="outline" disabled={journalEntries.length === 0}>
                <Download className="mr-2 h-5 w-5" /> Download Report
            </Button>
        </div>
      </header>

      {isLoading && <p className="text-center text-gray-500">Loading journal entries...</p>}

      {!isLoading && journalEntries.length === 0 && (
        <Card className="text-center py-12 bg-gray-50">
          <CardContent>
            <NotebookText className="mx-auto h-16 w-16 text-gray-400 mb-4" /> {/* Changed BookHeart to NotebookText */}
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Journal Entries Yet</h3>
            <p className="text-gray-500 mb-6">Start tracking your health by adding your first entry.</p>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add First Entry
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && journalEntries.length > 0 && (
        <div className="space-y-6">
          {journalEntries.map((entry) => (
            <JournalEntryCard 
              key={entry.id}
              entry={entry}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

      <JournalEntryForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        currentEntry={currentEntry}
        onInputChange={handleInputChange}
        onMoodChange={handleMoodChange}
        onPainLevelChange={handlePainLevelChange}
        onSubmit={handleSubmit}
        editingEntry={editingEntry}
      />
    </div>
  );
};

export default HealthJournalPage;