import type * as i from 'types';

export type GroupType = 'family' | 'friends' | 'work' | 'other';

export type Group = {
  id: string;
  name: string;
  created_at: string;
  qrcode: string;
  invite_code: string;
  type?: i.GroupType;
  admin_id: string;
  members: string;
};

export type FormattedGroup = Omit<i.Group, 'members'> & {
  members: string[];
};

export type CreateGroup = Pick<i.Group, 'name' | 'type' | 'invite_code'> & {
  userId: string;
};

export type UpdateGroup = {
  id: string;
  values: Partial<Omit<i.Group, 'id' | 'created_at' | 'invite_code' | 'qrcode'>>;
};
