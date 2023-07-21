import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { supabase } from 'src/utils';

function formatGroup(group: i.Group, usersOfGroup: i.User[]): i.FormattedGroup {
  return {
    ...group,
    members: usersOfGroup,
  };
}

export async function fetchGroupsOfUser(userId: string): Promise<i.Group[] | null> {
  // @TODO - fix this query with array includes/contains instead of textSearch
  const { data, error } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members, current_word')
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

export async function fetchGroupById(id: string): Promise<i.FormattedGroup | null> {
  const { data, error } = await supabase.from('groups').select().eq('id', id).single<i.Group>();

  const { data: usersOfGroup, error: usersError } = await supabase
    .from('users')
    .select()
    .filter('id', 'in', `(${data?.members})`);

  if (error || usersError) {
    console.error(error || usersError);
    return null;
  }

  return formatGroup(data, usersOfGroup as i.User[]);
}

export function useGroupById(groupId?: string) {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: ({ queryKey }) => fetchGroupById(queryKey[1]!),
    enabled: Boolean(groupId),
  });
}

// @TODO only used once in onboarding, is RQ needed?
export async function getGroupByInviteCode(
  code: string,
): Promise<{ data: i.Group | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .select()
    .eq('invite_code', code)
    .single<i.Group>();

  return {
    data,
    error,
  };
}
