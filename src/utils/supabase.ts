import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

import { SecureStoreAdapter } from './secureStore';

export const supabaseUrl = Constants!.expoConfig!.extra!.SUPABASE_URL;
const supabaseAnonKey = Constants!.expoConfig!.extra!.SUPABASE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
