import type * as i from 'types';

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

export const AvailableSafewords = [
  'Auto',
  'Avond',
  'Banaan',
  'Bureau',
  'Dansen',
  'Deur',
  'Hand',
  'Huis',
  'Jas',
  'Jurk',
  'Oplader',
  'Oven',
  'Plant',
  'Pizza',
  'Snelweg',
  'Strand',
  'Tafel',
  'Tosti',
  'Vrijdag',
  'Vlek',
  'Was',
  'Winkel',
  'Zolder',
] as const;

export function getNewSafeword(): i.SafeWords {
  const randomIndex = Math.floor(Math.random() * AvailableSafewords.length);
  const newSafeword = AvailableSafewords[randomIndex];

  return newSafeword;
}
