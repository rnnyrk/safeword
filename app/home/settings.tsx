import { useRouter } from 'expo-router';

import { useGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Button } from 'common/interaction/Button';
import { Container } from 'common/layout';
import { Text } from 'common/typography';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  console.log({ groups, user });

  return (
    <Container>
      <Text
        align="center"
        color="darkGray"
        size={48}
      >
        Settings
      </Text>
    </Container>
  );
}
