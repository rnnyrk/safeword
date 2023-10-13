import type * as i from 'types';
import { PostgrestError } from '@supabase/supabase-js';

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  groups: string | null;
};

export type CreateUserProps = {
  id: string;
  email: string;
  name: string;
};

export type UserReturn = Promise<{ data: i.User[] | null; error: PostgrestError | null }>;

export type UpdateUserProps = {
  email: string;
  values: Partial<Omit<i.User, 'id' | 'created_at'>>;
};

export type AdminUser = {
  id: string;
  user_id: string;
  created_by: string;
  group_id: string;
  created_at: string;
};

export type AdminProps = {
  userId: string;
  groupId: string;
};

export type AdminReturn = Promise<{ data: i.AdminUser[] | null; error: PostgrestError | null }>;
