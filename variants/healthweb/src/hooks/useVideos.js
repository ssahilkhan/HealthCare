import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setVideos(data || []);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error fetching videos",
        description: err.message,
        variant: "destructive",
      });
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, isLoading, error, fetchVideos };
}