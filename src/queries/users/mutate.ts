import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from 'src/utils';

export async function createUser({
  email,
  name,
}: i.CreateUserProps): Promise<{ data: i.User[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      name,
    })
    .select('id, email, name, group_1, created_at');

  return {
    data: data as unknown as i.User[],
    error,
  };
}

export async function updateUser({
  email,
  values,
}: i.UpdateUserProps): Promise<{ data: i.User[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('users')
    .update(values)
    .eq('email', email)
    .select('id, email, name, group_1, created_at');

  return {
    data: data as unknown as i.User[],
    error,
  };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, values }: i.UpdateUserProps) => updateUser({ email, values }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
}
