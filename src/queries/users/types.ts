import type * as i from 'types';

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  group_1: string | null;
};

export type CreateUserProps = {
  id: string;
  email: string;
  name: string;
};

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

export type CreateAdminProps = {
  userId: string;
  groupId: string;
};
