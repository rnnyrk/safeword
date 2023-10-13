import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getNewSafeword, supabase } from 'src/utils';

export async function createGroup({ userId, name, invite_code }: i.CreateGroup): i.GroupReturn {
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

// UPDATE
export async function updateGroup({ id, values }: i.UpdateGroup): i.GroupReturn {
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

// DELETE
export async function deleteGroup({ id }: i.DeleteGroup): i.GroupReturn {
  const { data, error } = await supabase.from('groups').delete().eq('id', id);

  return {
    data: data as unknown as i.Group[],
    error,
  };
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: i.DeleteGroup) => deleteGroup({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });
}

// REGENERATE CODE
export async function regenerateGroupCode({
  id,
  invite_code,
}: i.RegenerateGroupCode): i.GroupReturn {
  const { data, error } = await supabase
    .from('groups')
    .update({
      invite_code,
    })
    .eq('id', id)
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members, current_word');

  return {
    data: data as unknown as i.Group[],
    error,
  };
}

export function useRegenerateGroupCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, invite_code }: i.RegenerateGroupCode) =>
      regenerateGroupCode({ id, invite_code }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });
}
