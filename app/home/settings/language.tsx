import { useState } from 'react';
import { Alert, Pressable, ScrollView } from 'react-native';

import { useGroupsOfUser } from 'queries/groups';
import theme from 'styles/theme';
import { locales, onChangeLanguage } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { List } from 'common/interaction';
import { Container } from 'common/layout';
import { Check } from 'common/svg';
import { Text } from 'common/typography';

function LanguageSelector({ defaultLanguage, onChange }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Languages>(defaultLanguage || 'nl-NL');

  const languages: { value: Languages; label: string }[] = [
    {
      value: 'nl-NL',
      label: 'Nederlands',
    },
    {
      value: 'en-US',
      label: 'English',
    },
  ];

  function onChangeLanguage(language: Languages) {
    setCurrentLanguage(language);
    onChange(language);
  }

  return (
    <>
      {languages.map((language, index) => (
        <Pressable
          key={`language_${index}`}
          onPress={() => onChangeLanguage(language.value)}
        >
          {({ pressed }) => {
            const isActive = language.value === currentLanguage;

            return (
              <List.Item
                isPressed={pressed}
                size="large"
              >
                <List.Check active={isActive}>
                  {isActive && <Check fill={theme.colors.white} />}
                </List.Check>
                <List.Content>
                  <List.Text
                    size={18}
                    isPressed={pressed}
                  >
                    {language.label}
                  </List.Text>
                </List.Content>
              </List.Item>
            );
          }}
        </Pressable>
      ))}
    </>
  );
}

type Languages = 'nl-NL' | 'en-US';

type LanguageSelectorProps = {
  defaultLanguage?: Languages;
  onChange: (language: Languages) => void;
};

export default function LanguageScreen() {
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  if (!groups || !groups.length || !user) return null;

  console.log({
    availableLocales: locales.availableLocales,
    defaultLocale: locales.defaultLocale,
    locale: locales.locale,
  });

  function onChangeMyLanguage(language: Languages) {
    Alert.alert(
      locales.t('settings_language.change_language_title'),
      locales.t('settings_language.change_language_description'),
      [
        {
          text: locales.t('cancel_button'),
          style: 'cancel',
        },
        {
          text: locales.t('confirm_button'),
          onPress: async () => {
            onChangeLanguage(language);
          },
        },
      ],
    );
  }

  function onChangeGroupLanguage(language: Languages) {
    console.log(language);
  }

  return (
    <Container alignItems="flex-start">
      <ScrollView>
        <Text
          size={32}
          color="darkGray"
          marginTop={64}
          marginBottom={8}
        >
          {locales.t('settings_language.your_language')}
        </Text>
        <Text
          color="darkGray"
          size={18}
          fontFamily={400}
          marginBottom={32}
        >
          {locales.t('settings_language.your_description')}
        </Text>
        <LanguageSelector
          defaultLanguage={locales.locale as Languages}
          onChange={onChangeMyLanguage}
        />

        <Text
          size={32}
          color="darkGray"
          marginTop={64}
          marginBottom={8}
        >
          {locales.t('settings_language.group_language')}
        </Text>
        <Text
          color="darkGray"
          size={18}
          fontFamily={400}
          marginBottom={32}
        >
          {locales.t('settings_language.group_description')}
        </Text>
        <LanguageSelector onChange={onChangeGroupLanguage} />
      </ScrollView>
    </Container>
  );
}
