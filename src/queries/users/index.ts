import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { supabase } from 'src/utils';

export async function fetchUserByEmail(email: string): Promise<i.User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, groups, created_at')
    .eq('email', email)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export function useGetUserByEmail(email?: string) {
  return useQuery({
    queryKey: ['user', email],
    queryFn: ({ queryKey }) => fetchUserByEmail(queryKey[1]!),
    enabled: Boolean(email),
  });
}

export async function getUserByEmail(
  email: string,
): Promise<{ data: i.User | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, groups, created_at')
    .eq('email', email)
    .single();

  return {
    data,
    error,
  };
}
