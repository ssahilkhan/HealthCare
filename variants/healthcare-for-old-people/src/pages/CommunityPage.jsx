
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Heart, 
  ThumbsUp,
  MessageCircle,
  Trash2,
  Edit,
  User,
  MapPin,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCommunity } from '@/hooks/useCommunity';

const CommunityPage = () => {
  const { events, posts, addEvent, updateEvent, deleteEvent, rsvpToEvent, addPost, deletePost, addComment, likePost } = useCommunity();
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: 'Community Center'
  });
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'You'
  });
  const [commentText, setCommentText] = useState('');
  const [activePostId, setActivePostId] = useState(null);
  
  // Reset form when dialog closes
  const resetEventForm = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      organizer: 'Community Center'
    });
  };
  
  const resetPostForm = () => {
    setNewPost({
      title: '',
      content: '',
      author: 'You'
    });
  };
  
  // Handle form submission for adding event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    // Combine date and time
    const dateTime = newEvent.date + (newEvent.time ? `T${newEvent.time}` : 'T12:00');
    
    addEvent({
      ...newEvent,
      date: dateTime
    });
    
    setIsAddEventDialogOpen(false);
    resetEventForm();
  };
  
  // Handle form submission for adding post
  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return;
    
    addPost(newPost);
    setIsAddPostDialogOpen(false);
    resetPostForm();
  };
  
  // Handle adding a comment to a post
  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;
    
    addComment(postId, {
      text: commentText,
      author: 'You'
    });
    
    setCommentText('');
    setActivePostId(null);
  };
  
  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Format date for post/comment timestamp
  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Get upcoming events (sorted by date)
  const getUpcomingEvents = () => {
    const now = new Date();
    
    return events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  // Get past events
  const getPastEvents = () => {
    const now = new Date();
    
    return events
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-2 h-8 w-8 text-primary" />
            Community
          </h1>
          <p className="text-gray-600 mt-1">
            Connect with others, join events, and share experiences
          </p>
        </div>
      </header>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="events" className="text-lg">Events</TabsTrigger>
          <TabsTrigger value="discussion" className="text-lg">Discussion Board</TabsTrigger>
        </TabsList>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary" />
              Community Events
            </h2>
            
            <Button 
              onClick={() => setIsAddEventDialogOpen(true)}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
          
          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-medium mb-4">Upcoming Events</h3>
            
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    formatDate={formatEventDate}
                    formatTime={formatEventTime}
                    onRsvp={(attending) => rsvpToEvent(event.id, 'user-1', attending)}
                    onDelete={() => deleteEvent(event.id)}
                    isAttending={event.attendees?.includes('user-1')}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-blue-50 border-dashed border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-xl text-blue-700 mb-2">No upcoming events</h3>
                  <p className="text-blue-600 mb-6">
                    There are no upcoming events scheduled at this time
                  </p>
                  <Button onClick={() => setIsAddEventDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-4">Past Events</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastEvents.slice(0, 4).map((event) => (
                  <Card key={event.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-gray-500 text-sm">
                        {formatEventDate(event.date)} at {formatEventTime(event.date)}
                      </p>
                      <div className="flex items-center mt-2 text-gray-500 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{event.attendees?.length || 0} attended</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Discussion Board Tab */}
        <TabsContent value="discussion" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-primary" />
              Discussion Board
            </h2>
            
            <Button 
              onClick={() => setIsAddPostDialogOpen(true)}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
          
          {sortedPosts.length > 0 ? (
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <PostCard 
                  key={post.id}
                  post={post}
                  formatTimestamp={formatTimestamp}
                  onLike={() => likePost(post.id)}
                  onDelete={() => deletePost(post.id)}
                  onAddComment={() => setActivePostId(post.id)}
                  isActive={activePostId === post.id}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  handleAddComment={() => handleAddComment(post.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-purple-50 border-dashed border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-xl text-purple-700 mb-2">No discussions yet</h3>
                <p className="text-purple-600 mb-6">
                  Start a conversation or share something with the community
                </p>
                <Button 
                  onClick={() => setIsAddPostDialogOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Event Dialog */}
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Enter event description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="Enter event location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input 
                id="organizer" 
                value={newEvent.organizer}
                onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                placeholder="Enter organizer name"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Post Dialog */}
      <Dialog open={isAddPostDialogOpen} onOpenChange={setIsAddPostDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Post</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Title</Label>
              <Input 
                id="post-title" 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Enter post title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Input 
                id="post-content" 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="What would you like to share?"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPost}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, formatDate, formatTime, onRsvp, onDelete, isAttending }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={isAttending ? 'border-green-300 bg-green-50' : ''}>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Event</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this event? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(event.date)} at {formatTime(event.date)}
            </div>
            
            {event.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
            )}
            
            {event.organizer && (
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                Organized by: {event.organizer}
              </div>
            )}
          </div>
          
          {event.description && (
            <p className="mt-3 text-gray-700">{event.description}</p>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{event.attendees?.length || 0} attending</span>
            </div>
            
            <Button 
              variant={isAttending ? "outline" : "default"}
              className={isAttending ? "border-green-500 text-green-700" : ""}
              onClick={() => onRsvp(!isAttending)}
            >
              {isAttending ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Attending
                </>
              ) : (
                "RSVP"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Post Card Component
const PostCard = ({ 
  post, 
  formatTimestamp, 
  onLike, 
  onDelete, 
  onAddComment,
  isActive,
  commentText,
  setCommentText,
  handleAddComment
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 bg-primary">
                <AvatarFallback className="text-white">
                  {post.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <p className="text-gray-500 text-sm">
                  Posted by {post.author} • {formatTimestamp(post.createdAt)}
                </p>
              </div>
            </div>
            
            {post.author === 'You' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this post? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={onDelete}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="py-2">
          <p className="text-gray-700">{post.content}</p>
          
          {/* Comments Section */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medium text-gray-700">Comments</h4>
              
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 bg-gray-400">
                      <AvatarFallback className="text-white text-xs">
                        {comment.author.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm font-medium">{comment.author}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {formatTimestamp(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Comment Form */}
          {isActive && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="comment">Add a comment</Label>
              <div className="flex gap-2">
                <Input 
                  id="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  className="flex-1"
                />
                <Button onClick={handleAddComment}>Post</Button>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2 flex justify-between">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={onLike}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {post.likes || 0}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gray-600 hover:text-purple-600"
              onClick={onAddComment}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments?.length || 0}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CommunityPage;
