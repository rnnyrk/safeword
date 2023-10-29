import { EnSafewords } from './safewords/en';
import { NlSafewords } from './safewords/nl';

export type Language = 'nl-NL' | 'en-US';

export type AvailableSafeWords = typeof NlSafewords | typeof EnSafewords;
