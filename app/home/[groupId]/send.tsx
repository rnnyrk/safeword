import { useRouter, useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import { Button } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';

export default function GroupScreen() {
  const router = useRouter();
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  return (
    <Container>
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 24 }}
      >
        Safeword versturen
      </Text>
      <Button onPress={() => router.push('/home/')}>Terug naar het groepen</Button>
    </Container>
  );
}
