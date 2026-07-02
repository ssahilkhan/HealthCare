import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useCommunity() {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = useCallback(async () => {
    const { data, error } = await supabase
      .from('community_events')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      toast({ title: "Error fetching events", description: error.message, variant: "destructive" });
      return [];
    }
    return data || [];
  }, [toast]);

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching posts", description: error.message, variant: "destructive" });
      return [];
    }
    return data || [];
  }, [toast]);

  const loadCommunityData = useCallback(async () => {
    setIsLoading(true);
    const [eventsData, postsData] = await Promise.all([fetchEvents(), fetchPosts()]);
    setEvents(eventsData);
    setPosts(postsData);
    setIsLoading(false);
  }, [fetchEvents, fetchPosts]);

  useEffect(() => {
    loadCommunityData();
  }, [loadCommunityData]);

  const addEvent = async (event) => {
    const { data, error } = await supabase
      .from('community_events')
      .insert([{ ...event, attendees: event.attendees || [] }])
      .select()
      .single();
    if (error) {
      toast({ title: "Error adding event", description: error.message, variant: "destructive" });
      return null;
    }
    setEvents(prev => [data, ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
    toast({ title: "Event Added", description: `${data.title} has been added.` });
    return data;
  };

  const updateEvent = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('community_events')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      toast({ title: "Error updating event", description: error.message, variant: "destructive" });
    } else {
      setEvents(prev => prev.map(e => (e.id === id ? data : e)).sort((a,b) => new Date(b.date) - new Date(a.date)));
      toast({ title: "Event Updated", description: "Event details updated." });
    }
  };

  const deleteEvent = async (id) => {
    const eventToDelete = events.find(e => e.id === id);
    const { error } = await supabase.from('community_events').delete().eq('id', id);
    if (error) {
      toast({ title: "Error deleting event", description: error.message, variant: "destructive" });
    } else {
      setEvents(prev => prev.filter(e => e.id !== id));
      toast({ title: "Event Removed", description: `${eventToDelete?.title || 'Event'} removed.`, variant: "destructive" });
    }
  };

  const rsvpToEvent = async (eventId, userId, attending) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    let attendees = [...(event.attendees || [])];
    if (attending) {
      if (!attendees.some(att => att.userId === userId)) { // Assuming attendees are objects like { userId: 'user-1' }
        attendees.push({ userId }); // Store as object or adapt as needed
      }
    } else {
      attendees = attendees.filter(att => att.userId !== userId);
    }

    const { data, error } = await supabase
      .from('community_events')
      .update({ attendees, updated_at: new Date().toISOString() })
      .eq('id', eventId)
      .select()
      .single();

    if (error) {
      toast({ title: "Error RSVPing", description: error.message, variant: "destructive" });
    } else {
      setEvents(prev => prev.map(e => (e.id === eventId ? data : e)));
      toast({ title: attending ? "RSVP Confirmed" : "RSVP Cancelled", description: `Your RSVP for ${data.title} is updated.` });
    }
  };


  const addPost = async (post) => {
    const { data, error } = await supabase
      .from('community_posts')
      .insert([{ ...post, comments: post.comments || [], likes: post.likes || 0 }])
      .select()
      .single();
    if (error) {
      toast({ title: "Error adding post", description: error.message, variant: "destructive" });
      return null;
    }
    setPosts(prev => [data, ...prev]);
    toast({ title: "Post Added", description: "Your post is live." });
    return data;
  };

  const updatePost = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('community_posts')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      toast({ title: "Error updating post", description: error.message, variant: "destructive" });
    } else {
      setPosts(prev => prev.map(p => (p.id === id ? data : p)));
      toast({ title: "Post Updated", description: "Your post has been updated." });
    }
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from('community_posts').delete().eq('id', id);
    if (error) {
      toast({ title: "Error deleting post", description: error.message, variant: "destructive" });
    } else {
      setPosts(prev => prev.filter(p => p.id !== id));
      toast({ title: "Post Removed", description: "Post deleted.", variant: "destructive" });
    }
  };

  const addComment = async (postId, comment) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newComment = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...comment };
    const updatedComments = [...(post.comments || []), newComment];
    
    const { data, error } = await supabase
      .from('community_posts')
      .update({ comments: updatedComments, updated_at: new Date().toISOString() })
      .eq('id', postId)
      .select()
      .single();

    if (error) {
      toast({ title: "Error adding comment", description: error.message, variant: "destructive" });
    } else {
      setPosts(prev => prev.map(p => (p.id === postId ? data : p)));
      toast({ title: "Comment Added", description: "Your comment has been posted." });
    }
  };

  const likePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const currentLikes = post.likes || 0;
    const { data, error } = await supabase
      .from('community_posts')
      .update({ likes: currentLikes + 1, updated_at: new Date().toISOString() })
      .eq('id', postId)
      .select()
      .single();
    
    if (error) {
      toast({ title: "Error liking post", description: error.message, variant: "destructive" });
    } else {
      setPosts(prev => prev.map(p => (p.id === postId ? data : p)));
    }
  };

  return {
    events,
    posts,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    rsvpToEvent,
    addPost,
    updatePost,
    deletePost,
    addComment,
    likePost,
    fetchEvents,
    fetchPosts,
    loadCommunityData
  };
}