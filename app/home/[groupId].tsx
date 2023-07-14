import { useRouter, useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import { Button } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { GroupSafeword } from 'modules/groups';

export default function GroupScreen() {
  const router = useRouter();
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  return (
    <Container>
      <GroupSafeword />
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 24 }}
      >
        {group?.name}
      </Text>
      <Button onPress={() => router.back()}>Terug naar het overzicht</Button>
    </Container>
  );
}
