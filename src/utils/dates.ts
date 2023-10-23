import * as Localization from 'expo-localization';

export function formatDate(input?: string | number): string {
  const date = input ? new Date(input) : new Date();
  return date.toLocaleDateString(Localization.locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
