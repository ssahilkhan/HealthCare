import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Phone, Video, Plus, Edit, Trash2, UserPlus, Mail, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter as DialogFooterComponent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { motion } from 'framer-motion';

const FamilyPage = () => {
  const { familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember, isLoading } = useFamilyMembers();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [currentMember, setCurrentMember] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    avatar_url: '',
  });

  const handleOpenForm = (member = null) => {
    if (member) {
      setEditingMember(member);
      setCurrentMember({ ...member });
    } else {
      setEditingMember(null);
      setCurrentMember({ name: '', relationship: '', phone: '', email: '', avatar_url: '' });
    }
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrentMember(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!currentMember.name || !currentMember.relationship) {
      toast({ title: "Missing Information", description: "Name and relationship are required.", variant: "destructive" });
      return;
    }

    let success;
    if (editingMember) {
      success = await updateFamilyMember(editingMember.id, currentMember);
      if (success) {
        toast({ title: "Success", description: "Family member updated." });
      } else {
        toast({ title: "Error", description: "Failed to update family member.", variant: "destructive" });
      }
    } else {
      success = await addFamilyMember(currentMember);
      if (success) {
        toast({ title: "Success", description: "Family member added." });
      } else {
        toast({ title: "Error", description: "Failed to add family member.", variant: "destructive" });
      }
    }
    if (success) setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    const success = await deleteFamilyMember(id);
    if (success) {
      toast({ title: "Success", description: "Family member removed." });
    } else {
      toast({ title: "Error", description: "Failed to remove family member.", variant: "destructive" });
    }
  };
  
  const getInitials = (name) => {
    if (!name) return 'FM';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const handleShareHealthLog = (memberName) => {
    toast({
      title: `Sharing Health Log`,
      description: `Health log shared with ${memberName}. (This is a simulated action)`,
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-3 h-8 w-8 text-purple-500" />
            Family & Support Network
          </h1>
          <p className="text-gray-600 mt-1">Stay connected with your loved ones and share updates.</p>
        </div>
        <Button onClick={() => handleOpenForm()} size="lg">
          <UserPlus className="mr-2 h-5 w-5" /> Add Family Member
        </Button>
      </header>

      {isLoading && <p className="text-center text-gray-500">Loading family members...</p>}

      {!isLoading && familyMembers.length === 0 && (
        <Card className="text-center py-12 bg-gray-50">
          <CardContent>
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Family Members Added</h3>
            <p className="text-gray-500 mb-6">Connect with your family by adding their contact details.</p>
            <Button onClick={() => handleOpenForm()}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && familyMembers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar_url || `https://avatar.vercel.sh/${member.name.split(' ').join('+')}.png?text=${getInitials(member.name)}`} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-purple-700">{member.name}</CardTitle>
                    <p className="text-sm text-gray-500">{member.relationship}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center text-sm text-primary hover:underline">
                      <Phone className="mr-2 h-4 w-4" /> {member.phone}
                    </a>
                  )}
                  {member.email && (
                     <a href={`mailto:${member.email}`} className="flex items-center text-sm text-primary hover:underline">
                      <Mail className="mr-2 h-4 w-4" /> {member.email}
                    </a>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t pt-4">
                  <div className="flex w-full gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="mr-1 h-4 w-4" /> Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Video className="mr-1 h-4 w-4" /> Video Call
                    </Button>
                  </div>
                  <div className="flex w-full gap-2 items-center">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleShareHealthLog(member.name)}>
                      <Share2 className="mr-1 h-4 w-4" /> Share Log
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(member)}>
                      <Edit className="h-4 w-4 text-gray-600 hover:text-primary" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Family Member</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {member.name} from your family network?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(member.id)} className="bg-red-500 hover:bg-red-600">Remove</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{editingMember ? 'Edit' : 'Add'} Family Member</DialogTitle>
            <DialogDescription>
              Enter the details of your family member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={currentMember.name} onChange={handleInputChange} placeholder="e.g., Jane Doe" />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input id="relationship" value={currentMember.relationship} onChange={handleInputChange} placeholder="e.g., Daughter, Son, Friend" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" value={currentMember.phone} onChange={handleInputChange} placeholder="e.g., +1234567890" />
            </div>
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input id="email" type="email" value={currentMember.email} onChange={handleInputChange} placeholder="e.g., jane.doe@example.com" />
            </div>
            <div>
              <Label htmlFor="avatar_url">Avatar URL (Optional)</Label>
              <Input id="avatar_url" value={currentMember.avatar_url} onChange={handleInputChange} placeholder="Link to profile picture" />
            </div>
          </div>
          <DialogFooterComponent>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Member</Button>
          </DialogFooterComponent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyPage;