import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchEbooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setEbooks(data || []);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error fetching e-books",
        description: err.message,
        variant: "destructive",
      });
      setEbooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchEbooks();
  }, [fetchEbooks]);

  return { ebooks, isLoading, error, fetchEbooks };
}