import type * as i from 'types';
import { useState } from 'react';
import { Pressable } from 'react-native';

import theme from 'styles/theme';
import { List } from 'common/interaction';
import { Check } from 'common/svg';

export function LanguageSelector({ defaultLanguage, onChange }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<i.Language>(defaultLanguage || 'nl-NL');

  const languages: { value: i.Language; label: string }[] = [
    {
      value: 'nl-NL',
      label: 'Nederlands',
    },
    {
      value: 'en-US',
      label: 'English',
    },
  ];

  function onChangeLanguage(language: i.Language) {
    onChange(language, () => setCurrentLanguage(language));
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

type LanguageSelectorProps = {
  defaultLanguage?: i.Language;
  onChange: (language: i.Language, onChangeCallback: () => void) => void;
};
