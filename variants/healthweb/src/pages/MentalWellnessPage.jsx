import React, { useState, useEffect } from 'react';
import { Brain, Puzzle, Smile, Music, Image, Lightbulb, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter as DialogFooterComponent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const affirmations = [
  "I am calm and at peace.",
  "I choose to be happy today.",
  "I am strong and resilient.",
  "I am grateful for the good things in my life.",
  "I embrace new experiences with an open mind.",
  "I am loved and appreciated.",
  "I am capable of handling any challenge.",
  "Every day is a new beginning."
];

const relaxingMusic = [
  { id: 1, title: "Peaceful Piano", url: "https://www.youtube.com/embed/9Q634rbsypE?si=EXAMPLE", description: "Soothing piano melodies for relaxation." },
  { id: 2, title: "Nature Sounds", url: "https://www.youtube.com/embed/foret-sons-calmes-pour-dormir-etudier-se-detendre-mediter-asmr-binaural-beats-10-heures-gKk9x9qA0Lw?si=EXAMPLE", description: "Calming sounds of nature, like rain or forests." },
  { id: 3, title: "Ambient Meditation", url: "https://www.youtube.com/embed/meditation-relax-music-omnoi-ASMR-binaural-beats-10-heures-qYg0M0g0M0M?si=EXAMPLE", description: "Gentle ambient music for meditation and focus." }
];

const brainGames = [
  { id: 'sudoku', name: 'Sudoku', description: 'Classic number puzzle game.', icon: <Puzzle className="h-8 w-8 text-blue-500" />, link: '#' },
  { id: 'memory', name: 'Memory Cards', description: 'Test your memory by matching pairs.', icon: <Brain className="h-8 w-8 text-green-500" />, link: '#' },
  { id: 'quiz', name: 'General Knowledge Quiz', description: 'Fun questions to keep your mind sharp.', icon: <Lightbulb className="h-8 w-8 text-yellow-500" />, link: '#' }
];

const MentalWellnessPage = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [happyMemories, setHappyMemories] = useState(() => {
    const saved = localStorage.getItem('happyMemories');
    return saved ? JSON.parse(saved) : [];
  });
  const [isMemoryFormOpen, setIsMemoryFormOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: '', description: '', image_url: '' });
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAddMemory = () => {
    if (!newMemory.title) {
      toast({ title: "Title Required", description: "Please add a title for your memory.", variant: "destructive" });
      return;
    }
    const memoryToAdd = { ...newMemory, id: Date.now() };
    const updatedMemories = [...happyMemories, memoryToAdd];
    setHappyMemories(updatedMemories);
    localStorage.setItem('happyMemories', JSON.stringify(updatedMemories));
    setIsMemoryFormOpen(false);
    setNewMemory({ title: '', description: '', image_url: '' });
    toast({ title: "Memory Added!", description: "Your happy memory has been saved." });
  };

  const handleDeleteMemory = (id) => {
    const updatedMemories = happyMemories.filter(mem => mem.id !== id);
    setHappyMemories(updatedMemories);
    localStorage.setItem('happyMemories', JSON.stringify(updatedMemories));
    toast({ title: "Memory Removed", description: "The memory has been deleted." });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center">
          <Smile className="mr-3 h-8 w-8 text-yellow-500" />
          Mental Wellness & Entertainment
        </h1>
        <p className="text-gray-600 mt-1">Activities to keep your mind active, positive, and engaged.</p>
      </header>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-700">Positive Affirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p
            key={currentAffirmation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-yellow-800 text-center italic"
          >
            "{currentAffirmation}"
          </motion.p>
        </CardContent>
      </Card>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="games" className="text-base"><Puzzle className="mr-2 h-5 w-5" />Brain Games</TabsTrigger>
          <TabsTrigger value="music" className="text-base"><Music className="mr-2 h-5 w-5" />Relaxing Music</TabsTrigger>
          <TabsTrigger value="memories" className="text-base"><Image className="mr-2 h-5 w-5" />Happy Memories</TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {brainGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-2">{game.icon}</div>
                    <CardTitle>{game.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">{game.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => toast({ title: "Coming Soon!", description: `${game.name} will be available soon.` })}>Play Game</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {relaxingMusic.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Music className="mr-2 h-5 w-5 text-indigo-500" />
                      {track.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm mb-3">{track.description}</p>
                    <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={track.url}
                        title={track.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="border-0"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="memories" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Happy Memories</h2>
            <Button onClick={() => setIsMemoryFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Memory
            </Button>
          </div>
          {happyMemories.length === 0 ? (
            <Card className="text-center py-8 bg-gray-50">
              <CardContent>
                <Image className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600">No happy memories added yet. Add a photo and a note to cherish your special moments.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {happyMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    {memory.image_url && (
                      <div className="aspect-video bg-gray-200 rounded-t-md overflow-hidden">
                        <img  src={memory.image_url} alt={memory.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1607827447604-d9a8c439186e" />
                      </div>
                    )}
                    {!memory.image_url && (
                       <div className="aspect-video bg-gray-100 rounded-t-md flex items-center justify-center">
                         <Image className="h-16 w-16 text-gray-300" />
                       </div>
                    )}
                    <CardHeader>
                      <CardTitle>{memory.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm">{memory.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteMemory(memory.id)}>Delete</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isMemoryFormOpen} onOpenChange={setIsMemoryFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Happy Memory</DialogTitle>
            <DialogDescription>
              Share a photo and a note about a moment you cherish.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="memory-title">Title</Label>
              <Input id="memory-title" value={newMemory.title} onChange={(e) => setNewMemory({...newMemory, title: e.target.value})} placeholder="e.g., Granddaughter's Birthday" />
            </div>
            <div>
              <Label htmlFor="memory-description">Description (Optional)</Label>
              <Textarea id="memory-description" value={newMemory.description} onChange={(e) => setNewMemory({...newMemory, description: e.target.value})} placeholder="A short note about this memory" />
            </div>
            <div>
              <Label htmlFor="memory-image_url">Image URL (Optional)</Label>
              <Input id="memory-image_url" value={newMemory.image_url} onChange={(e) => setNewMemory({...newMemory, image_url: e.target.value})} placeholder="Link to your photo (e.g., from Unsplash)" />
            </div>
          </div>
          <DialogFooterComponent>
            <Button variant="outline" onClick={() => setIsMemoryFormOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMemory}>Add Memory</Button>
          </DialogFooterComponent>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default MentalWellnessPage;