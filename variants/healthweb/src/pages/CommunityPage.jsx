import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Users, MessageSquare, Plus, ThumbsUp, MessageCircle as CommentIcon, Send } from 'lucide-react';
import { useCommunityForum } from '@/hooks/useCommunityForum'; 

const PostCard = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gray-50 p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author_avatar_url || `https://avatar.vercel.sh/${post.author_name}.png`} alt={post.author_name} />
            <AvatarFallback>{post.author_name?.substring(0,2).toUpperCase() || 'AN'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-poppins">{post.title}</CardTitle>
            <p className="text-xs text-gray-500 font-inter">
              By {post.author_name} • {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-700 font-inter mb-4 whitespace-pre-wrap">{post.content}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <Button variant="ghost" size="sm" onClick={() => onLike(post.id)} className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" /> {post.likes_count || 0} Likes
          </Button>
          <span className="flex items-center">
            <CommentIcon className="h-4 w-4 mr-1" /> {post.comments_count || 0} Comments
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t">
        <form onSubmit={handleCommentSubmit} className="flex w-full space-x-2">
          <Input 
            type="text" 
            placeholder="Write a comment..." 
            className="flex-grow text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="submit" size="sm"><Send className="h-4 w-4" /></Button>
        </form>
      </CardFooter>
      {/* Placeholder for displaying comments */}
    </Card>
  );
};


const CommunityPage = () => {
  const { posts, isLoading, error, addPost, addLike, addComment } = useCommunityForum();
  const [newPostData, setNewPostData] = useState({ title: '', content: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (newPostData.title.trim() && newPostData.content.trim()) {
      // Assuming a fixed author for now, replace with actual user later
      await addPost({ ...newPostData, author_name: 'Current User', author_id: 'user_placeholder_id' });
      setNewPostData({ title: '', content: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">Community Forum</h1>
        <p className="text-lg text-teal-100 mt-2 font-inter">Connect, share, and learn with fellow students and educators.</p>
      </header>

      <div className="flex justify-end mb-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-poppins">Create a New Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4 py-4">
              <div>
                <Label htmlFor="title" className="font-inter">Title</Label>
                <Input id="title" name="title" value={newPostData.title} onChange={handleInputChange} placeholder="Enter post title" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="content" className="font-inter">Content</Label>
                <textarea 
                  id="content" name="content" value={newPostData.content} onChange={handleInputChange} 
                  placeholder="Share your thoughts..." rows={5}
                  className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create Post</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p className="text-center text-lg">Loading posts...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error loading posts: {error}</p>}

      {!isLoading && !error && posts.length === 0 && (
        <div className="text-center py-10">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Posts Yet</h2>
          <p className="text-gray-600">Be the first to start a discussion in our community!</p>
        </div>
      )}
      
      {!isLoading && !error && posts.length > 0 && (
        <div className="max-w-3xl mx-auto">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PostCard post={post} onLike={addLike} onComment={addComment} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;