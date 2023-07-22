import type * as i from 'types';

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  group_1: string;
};

export type CreateUserProps = {
  email: string;
  name: string;
};

export type UpdateUserProps = {
  email: string;
  values: Partial<Omit<i.User, 'id' | 'created_at'>>;
};
