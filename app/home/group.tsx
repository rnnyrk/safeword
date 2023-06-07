import { useRouter } from 'expo-router';

import { Button } from 'common/interaction/Button';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { GroupSafeword } from 'modules/groups';

export default function GroupScreen() {
  const router = useRouter();

  return (
    <Container>
      <GroupSafeword />
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 24 }}
      >
        Familie Bakker
      </Text>
      <Button onPress={() => router.push('/')}>Terug naar het overzicht</Button>
    </Container>
  );
}
