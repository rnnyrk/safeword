import type * as i from 'types';

import { getAvailableSafewords } from 'locales/safewords';

import { Env } from './env';

export const getApiUrl = Env.EXPO_PUBLIC_SITE_URL;

export function getInviteCode(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;

  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

export function getNewSafeword(groupLanguage: i.Language): i.AvailableSafeWords {
  const availableSafewords = getAvailableSafewords(groupLanguage);

  const randomIndex = Math.floor(Math.random() * availableSafewords.length);
  const newSafeword = availableSafewords[randomIndex];

  return newSafeword as unknown as i.AvailableSafeWords;
}
