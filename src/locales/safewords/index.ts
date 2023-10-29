import type * as i from 'types';

import { EnSafewords } from './en';
import { NlSafewords } from './nl';

export function getAvailableSafewords(groupLanguage: i.Language): i.AvailableSafeWords {
  if (groupLanguage === 'nl-NL') {
    return NlSafewords;
  }

  return EnSafewords;
}
