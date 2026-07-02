import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchQuizzes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setQuizzes(data || []);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error fetching quizzes",
        description: err.message,
        variant: "destructive",
      });
      setQuizzes([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return { quizzes, isLoading, error, fetchQuizzes };
}