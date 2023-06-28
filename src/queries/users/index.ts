import * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from 'services';

export async function getUserByEmail(email: string): Promise<i.User | null> {
  const { data } = await supabase
    .from('users')
    .select('id, email, finished_onboarding, created_at')
    .eq('email', email)
    .single();

  return data;
}

export async function createNewUser(
  email: string,
): Promise<{ data: i.User | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
    })
    .select('id, email, finished_onboarding, created_at');

  return {
    data: data as unknown as i.User,
    error,
  };
}
