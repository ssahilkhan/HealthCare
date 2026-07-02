import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useCommunityForum() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('community_forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
      toast({ title: "Error fetching posts", description: err.message, variant: "destructive" });
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = async (postData) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('community_forum_posts')
        .insert([postData])
        .select()
        .single();
      
      if (supabaseError) throw supabaseError;
      setPosts(prev => [data, ...prev]);
      toast({ title: "Post Created", description: "Your post has been successfully created." });
      return data;
    } catch (err) {
      toast({ title: "Error creating post", description: err.message, variant: "destructive" });
      return null;
    }
  };

  const addLike = async (postId) => {
    // This is a simplified like. A real implementation would check if user already liked.
    // For now, just incrementing.
    // Also, user_id is hardcoded as 'current_user_placeholder'. Replace with actual user ID.
    try {
      // Check if user already liked
      const { data: existingLike, error: likeError } = await supabase
        .from('community_forum_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', 'current_user_placeholder') // Replace with actual user ID
        .maybeSingle();

      if (likeError) throw likeError;

      if (existingLike) {
        toast({ title: "Already Liked", description: "You have already liked this post.", variant: "default" });
        return;
      }

      // Add like record
      const { error: insertError } = await supabase
        .from('community_forum_likes')
        .insert([{ post_id: postId, user_id: 'current_user_placeholder' }]); // Replace with actual user ID
      
      if (insertError) throw insertError;

      // Increment likes_count on the post
      const { data, error: updateError } = await supabase.rpc('increment_likes', { row_id: postId });

      if (updateError) throw updateError;
      
      // Update local state
      setPosts(prevPosts => prevPosts.map(p => 
        p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
      ));
      toast({ title: "Post Liked!", variant: "default" });

    } catch (err) {
      toast({ title: "Error liking post", description: err.message, variant: "destructive" });
    }
  };
  
  // Supabase Edge Function for incrementing likes (create this in Supabase dashboard)
  // Name: increment_likes
  // -- SQL
  // create or replace function increment_likes(row_id uuid)
  // returns void
  // language plpgsql
  // as $$
  // begin
  //   update community_forum_posts
  //   set likes_count = likes_count + 1
  //   where id = row_id;
  // end;
  // $$;


  const addComment = async (postId, content) => {
    // Placeholder for author details. Replace with actual user data.
    const commentData = { 
      post_id: postId, 
      content, 
      author_name: 'Current User', 
      author_id: 'user_placeholder_id' 
    };
    try {
      const { data, error: supabaseError } = await supabase
        .from('community_forum_comments')
        .insert([commentData])
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      
      // Increment comments_count on the post
      await supabase.rpc('increment_comments', { row_id: postId });

      // For simplicity, we're not fetching all comments here.
      // A more robust solution would update the post's comments array or re-fetch.
      setPosts(prevPosts => prevPosts.map(p => 
        p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p
      ));
      toast({ title: "Comment Added", description: "Your comment has been posted." });
      return data;
    } catch (err) {
      toast({ title: "Error adding comment", description: err.message, variant: "destructive" });
      return null;
    }
  };

  // Supabase Edge Function for incrementing comments (create this in Supabase dashboard)
  // Name: increment_comments
  // -- SQL
  // create or replace function increment_comments(row_id uuid)
  // returns void
  // language plpgsql
  // as $$
  // begin
  //   update community_forum_posts
  //   set comments_count = comments_count + 1
  //   where id = row_id;
  // end;
  // $$;

  return { posts, isLoading, error, fetchPosts, addPost, addLike, addComment };
}