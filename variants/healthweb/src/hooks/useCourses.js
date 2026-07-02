import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setCourses(data || []);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error fetching courses",
        description: err.message,
        variant: "destructive",
      });
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, isLoading, error, fetchCourses };
}