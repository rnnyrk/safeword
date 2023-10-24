import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from 'locales/en';
import { nl } from 'locales/nl';

export function onChangeLanguage(lang: 'en-US' | 'nl-NL') {
  locales.locale = lang;
}

export const locales = new I18n(
  {
    'en-US': en,
    'nl-NL': nl,
  },
  {
    defaultLocale: 'en-US',
    locale: Localization.locale,
  },
);
