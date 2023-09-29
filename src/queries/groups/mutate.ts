import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getNewSafeword, supabase } from 'src/utils';

export async function createGroup({
  userId,
  name,
  invite_code,
}: i.CreateGroup): Promise<{ data: i.Group[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .insert({
      admin_id: userId,
      members: userId,
      name,
      invite_code,
      current_word: getNewSafeword(),
    })
    .select();

  return {
    data: data as unknown as i.Group[],
    error,
  };
}

export async function updateGroup({
  id,
  values,
}: i.UpdateGroup): Promise<{ data: i.Group[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .update(values)
    .eq('id', id)
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members, current_word');

  return {
    data: data as unknown as i.Group[],
    error,
  };
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: i.UpdateGroup) => updateGroup({ id, values }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });
}
