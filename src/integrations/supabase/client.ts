// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rqseahfvjdpbdvmoxpnq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxc2VhaGZ2amRwYmR2bW94cG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjA4MDIsImV4cCI6MjA2MTIzNjgwMn0.qC-1qaUwFnp6M6O6_4YMWEgVkOPOJyjKJ9cYf2JmE44";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);