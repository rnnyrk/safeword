import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export function onChangeLanguage(lang: 'en-US' | 'nl-NL') {
  locales.locale = lang;
}

export const locales = new I18n(
  {
    'en-US': {
      home: {
        new_group: 'New group',
      },
      group: {
        our_safeword: 'Our SafeWord is',
        send_safeword: 'Send SafeWord',
      },
      group_send: {
        description:
          'No phone at hand? No problem, send your secure SafeWord directly to the email of the acquaintance and verify his identity.',
        title: 'Share SafeWord',
        submit: 'Share',
      },
      login: {
        label: 'Login with',
        description:
          'Create an account and try it yourself, by creating an account you agree to our ',
        terms: 'terms and conditions',
        and: ' and ',
        privacy: 'privacy statement',
        subtitle: 'Realtime verification for every conversation.',
        title: 'Welcome to SafeWord',
      },
      menu: {
        my_group: 'My group',
        settings: 'Settings',
        logout: 'Logout',
      },
      new_group: {
        admin_error: 'Failed to create admin',
        delete_error: 'Failed to delete group',
        update_error: 'Failed to update user',
        label: 'New group',
        success: 'New group created',
        placeholder: 'Name of the group',
        submit: 'Create',
      },
      join_group: {
        already_member_error: 'You are already a member of this group',
        notfound_error: 'Group not found',
        update_group_error: 'Failed to update group',
        description: 'Enter the key code you received via email',
        title: 'Join group',
        submit: 'Join group',
      },
      invite_members: {
        send_error: 'Failed to send invitation',
        description:
          'Invite the people you want to collect in this group. All invitees of the group can also see each other',
        placeholder: 'example@email.com',
        title: 'Create group',
        skip: 'Skip',
        submit: 'Invite',
      },
      onboarding: {
        description: 'What do you want to do first?',
        create_group: 'Create a group',
        join_group: 'Join a group',
        welcome: 'Welcome',
      },
      settings: {
        account: 'Account',
        manage: 'Manage group',
      },
      settings_group: {
        admin: 'admin',
        delete_group: 'Delete group',
        new_code: 'New group code',
        manage:
          'Manage your group members, or generate a new group code to add people to your group.',
        overview: 'An overview of your group members.',
      },
    },
    'nl-NL': {
      home: {
        new_group: 'Nieuwe group',
      },
      group: {
        our_safeword: 'Ons SafeWord is',
        send_safeword: 'SafeWord versturen',
      },
      group_send: {
        description:
          'Geen telefoon bij de hand? Geen probleem stuur je beveiligde SafeWord direct door naar de email van de bekende en verifier zo zijn identiteit.',
        title: 'SafeWord vesturen',
        submit: 'Versturen',
      },
      login: {
        label: 'Inloggen met',
        description:
          'Maak nu een account aan en probeer het zelf, bij het maken van een account ga je akkoord met onze',
        terms: 'algemene voorwaarden',
        and: ' en ',
        privacy: 'privacy statement',
        subtitle: 'Realtime verificatie voor elk gesprek.',
        title: 'Welkom bij SafeWord',
      },
      menu: {
        my_group: 'Mijn groep',
        logout: 'Uitloggen',
        settings: 'Instellingen',
      },
      new_group: {
        admin_error: 'Beheerder aanmaken mislukt',
        delete_error: 'Groep verwijderen mislukt',
        update_error: 'Gebruiker aanpassen mislukt',
        label: 'Nieuwe groep',
        placeholder: 'Naam van de groep',
        success: 'Nieuwe groep aangemaakt',
        submit: 'Aanmaken',
      },
      join_group: {
        already_member_error: 'Je bent al lid van deze groep',
        notfound_error: 'Groep niet gevonden',
        update_group_error: 'Groep aanpassen mislukt',
        description: 'Voer de sleutelcode in die je via e-mail hebt ontvangen',
        title: 'Groep joinen',
        submit: 'Groep joinen',
      },
      invite_members: {
        send_error: 'Uitnodiging versturen mislukt',
        description:
          'Nodig de mensen uit die je wilt verzamelen in deze groep. Alle genodigden van de groep kunnen ook elkaar zien',
        placeholder: 'voorbeeld@email.nl',
        title: 'Groep aanmaken',
        skip: 'Overslaan',
        submit: 'Uitnodigen',
      },
      onboarding: {
        description: 'Wat wil je als eerste doen?',
        create_group: 'Een groep aanmaken',
        join_group: 'Een groep joinen',
        welcome: 'Welkom',
      },
      settings: {
        account: 'Account',
        manage: 'Beheer groep',
      },
      settings_group: {
        admin: 'beheerder',
        delete_group: 'Groep verwijderen',
        new_code: 'Nieuwe groepscode',
        manage:
          'Beheer je groepsleden, of genereer een nieuwe groepscode om mensen bij je groep te voegen.',
        overview: 'Een overzicht van je groepsleden.',
      },
    },
  },
  {
    defaultLocale: 'en-US',
    locale: Localization.locale,
  },
);
