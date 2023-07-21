import { useRouter, useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import { BackButton } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { GroupSafeword } from 'modules/groups';

export default function GroupScreen() {
  const router = useRouter();
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  return (
    <Container>
      <GroupSafeword groupId={params.groupId} />
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 24 }}
      >
        {group?.name}
      </Text>
      <BackButton style={{ marginTop: 16 }}>Terug naar het overzicht</BackButton>
    </Container>
  );
}
