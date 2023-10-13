import type * as i from 'types';

import { AvailableSafewords } from 'utils';

export type GroupType = 'family' | 'friends' | 'work' | 'other';

export type SafeWords = (typeof AvailableSafewords)[number];

export type Group = {
  id: string;
  name: string;
  created_at: string;
  qrcode: string;
  invite_code: string;
  type?: i.GroupType;
  admin_id: string;
  members: string;
  current_word: i.SafeWords;
};

export type FormattedGroup = Omit<i.Group, 'members'> & {
  members: i.User[];
};

export type CreateGroup = Pick<i.Group, 'name' | 'type' | 'invite_code'> & {
  userId: string;
};

export type UpdateGroup = {
  id: string;
  values: Partial<Omit<i.Group, 'id' | 'created_at' | 'invite_code' | 'qrcode'>>;
};

export type DeleteGroup = {
  id: string;
};

export type RegenerateGroupCode = {
  id: string;
  invite_code: string;
};
