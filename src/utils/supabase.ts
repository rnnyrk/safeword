import { createClient } from '@supabase/supabase-js';

import { Env } from './env';
import LargeSecureStore from './secureStore';

export const supabaseUrl = Env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
