import * as i from 'types';

export type GroupType = 'family' | 'friends' | 'work' | 'other';

export type Group = {
  id: string;
  name: string;
  created_at: string;
  qrcode: string;
  invite_code: string;
  type?: i.GroupType;
  admin: string;
};

export type CreateGroup = Pick<i.Group, 'name' | 'type' | 'invite_code' | 'admin'>;
