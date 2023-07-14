import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { supabase } from 'src/utils';

export async function fetchGroupsOfUser(userId: string): Promise<i.FormattedGroup[] | null> {
  // @TODO - fix this query with array includes/contains instead of textSearch
  const { data, error } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members')
    .textSearch('members', userId);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export function useGroupsOfUser(userId?: string) {
  return useQuery({
    queryKey: ['groups', userId],
    queryFn: ({ queryKey }) => fetchGroupsOfUser(queryKey[1]!),
    enabled: Boolean(userId),
  });
}

export async function getGroupById(
  id: string,
): Promise<{ data: i.FormattedGroup | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members')
    .eq('id', id)
    .single<i.Group>();

  return {
    data: data
      ? {
          ...data,
          // members: data.members.split(','),
          members: JSON.parse(data.members),
        }
      : null,
    error,
  };
}

export async function getGroupByInviteCode(
  code: string,
): Promise<{ data: i.FormattedGroup | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members')
    .eq('invite_code', code)
    .single<i.Group>();

  return {
    data: data
      ? {
          ...data,
          // members: data.members.split(','),
          members: JSON.parse(data.members),
        }
      : null,
    error,
  };
}
