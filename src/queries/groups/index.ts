import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from 'src/utils';

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

export async function getGroupsOfUser(
  userId: string,
): Promise<{ data: i.FormattedGroup[] | null; error: PostgrestError | null }> {
  // @TODO - fix this query with array includes/contains instead of textSearch
  const { data, error } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at, admin_id, members')
    .textSearch('members', userId);

  return {
    data: data
      ? data.map((group) => ({
          ...group,
          // members: group.members.split(','),
          members: JSON.parse(group.members),
        }))
      : null,
    error,
  };
}
