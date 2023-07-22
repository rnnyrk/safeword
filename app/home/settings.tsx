import { useGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Accordion } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { GroupItem } from 'modules/settings';

export default function SettingsScreen() {
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  if (!groups || !groups.length || !user) return null;

  return (
    <Container alignItems="flex-start">
      <Text
        size={32}
        color="gray"
        marginTop={40}
        marginBottom={16}
      >
        Account
      </Text>

      <Text color="darkGray">{user.name}</Text>
      <Text color="darkGray">{user.email}</Text>

      <Text
        size={32}
        color="gray"
        marginTop={64}
      >
        Groep beheren
      </Text>
      <Accordion.Root style={{ marginTop: 16 }}>
        {groups.map((group, index) => (
          <Accordion.Item
            key={`group_${index}`}
            title={group.name}
          >
            <GroupItem groupId={group.id} />
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
}
