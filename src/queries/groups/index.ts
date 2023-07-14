import * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from 'src/utils';

export async function getGroupById(id: string): Promise<i.Group | null> {
  const { data } = await supabase
    .from('groups')
    .select('id, name, qrcode, invite_code, type, created_at')
    .eq('id', id)
    .single();

  return data;
}

export async function createGroup({
  name,
  type,
  invite_code,
}: i.CreateGroup): Promise<{ data: i.Group | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('groups')
    .insert({
      name,
      type,
      invite_code,
    })
    .select('id, name, qrcode, invite_code, type, created_at');

  return {
    data: data as unknown as i.Group,
    error,
  };
}
