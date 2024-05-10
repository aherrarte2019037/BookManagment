import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://twbcdzatgncpqiomnnda.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3YmNkemF0Z25jcHFpb21ubmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwOTgxNTYsImV4cCI6MjAyNzY3NDE1Nn0.o-8iFiprRac5eYsghljeiI6Syj5bPO1jkj7XAXFWUZ0';

export const supabase = createClient(supabaseUrl, supabaseKey);