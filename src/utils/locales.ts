import type * as i from 'types';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from 'locales/en';
import { nl } from 'locales/nl';

import { storeLocalData } from './storage';

const defaultLanguage = 'en-US';
const LanguageOptions: string[] = ['en-US', 'nl-NL'];

export function onChangeLanguage(lang: i.Languages) {
  let newLang = lang;
  if (!LanguageOptions.includes(lang)) {
    newLang = defaultLanguage;
  }

  locales.locale = newLang;
  storeLocalData('locale', newLang);
}

export const locales = new I18n(
  {
    'en-US': en,
    'nl-NL': nl,
  },
  {
    defaultLocale: defaultLanguage,
    locale: LanguageOptions.includes(Localization.locale) ? Localization.locale : defaultLanguage,
  },
);
