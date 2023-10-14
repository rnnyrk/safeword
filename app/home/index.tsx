import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton } from 'common/interaction';
import { Container } from 'common/layout';
import { Group, GroupGrid } from 'modules/groups';

export default function GroupsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  if (!groups) return null;

  const amountOfGroups = groups.length;

  return (
    <Container>
      <GroupGrid groupsLength={groups.length}>
        {groups.map((group) => (
          <Group
            key={group.id}
            name={group.name}
            groupId={group.id}
            size={groups.length > 1 ? 'small' : 'large'}
          />
        ))}
      </GroupGrid>
      {amountOfGroups < 4 && (
        <ActionButton
          style={{ marginBottom: insets.bottom }}
          direction="right"
          variant="secondary"
          onPress={() => router.push({ pathname: '/home/new-group' })}
        >
          Nieuwe groep
        </ActionButton>
      )}
    </Container>
  );
}
