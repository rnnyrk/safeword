import { useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import { windowWidth } from 'utils';
import { Container } from 'common/layout';
import { SendSafeword } from 'modules/groups/SendSafeword';

export default function GroupScreen() {
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  const groupSize = windowWidth - 40;

  if (!group) return null;

  return (
    <Container alignItems="flex-start">
      <SendSafeword
        group={group}
        groupSize={groupSize}
      />
    </Container>
  );
}
