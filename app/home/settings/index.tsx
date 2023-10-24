import { useRouter } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';

import { useGroupsOfUser } from 'queries/groups';
import theme from 'styles/theme';
import { locales } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { List } from 'common/interaction';
import { Container } from 'common/layout';
import { ArrowRight } from 'common/svg';
import { Text } from 'common/typography';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  if (!groups || !groups.length || !user) return null;

  const language = locales.defaultLocale === 'nl-NL' ? 'Nederland' : 'English';

  return (
    <Container alignItems="flex-start">
      <ScrollView>
        <Text
          size={32}
          color="darkGray"
          marginTop={40}
          marginBottom={16}
        >
          {locales.t('settings.account')}
        </Text>

        <Text color="black">{user.name}</Text>
        <Text
          color="black"
          fontFamily={400}
        >
          {user.email}
        </Text>

        <Text
          size={32}
          color="darkGray"
          marginTop={64}
          marginBottom={16}
        >
          {locales.t('settings.manage')}
        </Text>
        {groups.map((group, index) => {
          return (
            <Pressable
              key={`list_${index}`}
              onPress={() =>
                router.push({
                  pathname: '/home/settings/[groupId]/',
                  params: { groupId: group.id },
                })
              }
              style={{ width: '100%' }}
            >
              {({ pressed }) => (
                <List.Item
                  isPressed={pressed}
                  variant="secondary"
                  size="large"
                >
                  <List.Text
                    color="white"
                    style={{ flex: 2 }}
                  >
                    {group.name}
                  </List.Text>
                  <List.Action>
                    <ArrowRight fill={theme.colors.white} />
                  </List.Action>
                </List.Item>
              )}
            </Pressable>
          );
        })}

        <Text
          size={32}
          color="darkGray"
          marginTop={64}
          marginBottom={16}
        >
          {locales.t('settings.language')}
        </Text>
        <Pressable
          onPress={() => router.push({ pathname: '/home/settings/language/' })}
          style={{ width: '100%' }}
        >
          {({ pressed }) => (
            <List.Item
              isPressed={pressed}
              variant="secondary"
              size="large"
            >
              <List.Text
                color="white"
                style={{ flex: 2 }}
              >
                {language}
              </List.Text>
              <List.Action>
                <ArrowRight fill={theme.colors.white} />
              </List.Action>
            </List.Item>
          )}
        </Pressable>
      </ScrollView>
    </Container>
  );
}
