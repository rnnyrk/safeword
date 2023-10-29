import type * as i from 'types';
import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

import { useGroupsOfUser } from 'queries/groups';
import { locales, onChangeAppLanguage } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { useToast } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { LanguageSelector } from 'modules/settings';

export default function LanguageScreen() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  if (!groups || !groups.length || !user) return null;

  function onChangeMyLanguage(language: i.Language, onChangeCallback: () => void) {
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
          onPress: () => {
            onChangeCallback();
            onChangeAppLanguage(language);
            toast.show({
              message: locales.t('settings_language.change_language_success'),
              variant: 'success',
            });
            router.push('/home/settings/');
          },
        },
      ],
    );
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
          defaultLanguage={locales.locale as i.Language}
          onChange={onChangeMyLanguage}
        />
      </ScrollView>
    </Container>
  );
}
