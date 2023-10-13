import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supabase } from 'src/utils';

export async function createUser({ id, email, name }: i.CreateUserProps): i.UserReturn {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id,
      email,
      name,
    })
    .select('id, email, name, created_at');

  return {
    data: data as unknown as i.User[],
    error,
  };
}

export async function updateUser({ email, values }: i.UpdateUserProps): i.UserReturn {
  const { data, error } = await supabase
    .from('users')
    .update(values)
    .eq('email', email)
    .select('id, email, name, groups, created_at');

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

// Create user on admin table
export async function createAdmin({ userId, groupId }: i.AdminProps): i.AdminReturn {
  const { data, error } = await supabase
    .from('admins')
    .insert({
      user_id: userId,
      created_by: userId,
      group_id: groupId,
    })
    .select('user_id, group_id, created_by');

  return {
    data: data as unknown as i.AdminUser[],
    error,
  };
}

// delete admin
export async function deleteAdmin({ userId, groupId }: i.AdminProps): i.AdminReturn {
  const { data, error } = await supabase
    .from('admins')
    .delete()
    .eq('user_id', userId)
    .eq('group_id', groupId);

  return {
    data: data as unknown as i.AdminUser[],
    error,
  };
}
