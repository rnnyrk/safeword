import { useRouter, useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import theme from 'styles/theme';
import { windowWidth } from 'utils';
import { BackButton } from 'common/interaction';
import { AnimatedGroup, Container } from 'common/layout';
import { Bubble } from 'common/svg';
import { SendSafeword } from 'modules/groups/SendSafeword';

export default function GroupScreen() {
  const router = useRouter();
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  const groupSize = windowWidth - 40;

  if (!group) return null;

  return (
    <Container>
      <AnimatedGroup size={groupSize}>
        <SendSafeword />
        <Bubble
          $position="absolute"
          fill={theme.colors.primary}
          width={groupSize}
          height={groupSize}
        />
      </AnimatedGroup>

      <BackButton style={{ marginTop: 32 }}>Terug naar het overzicht</BackButton>
    </Container>
  );
}
