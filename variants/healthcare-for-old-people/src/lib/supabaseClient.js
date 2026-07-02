import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlamuvaxrnlgskwtfjuy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYW11dmF4cm5sZ3Nrd3RmanV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjk2MTEsImV4cCI6MjA2Mjk0NTYxMX0.SlCrMS5cPauKuJVxArl35W-8nKZwO9z-4LbMDvfU8VM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);