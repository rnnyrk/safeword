import { useRouter, useSearchParams } from 'expo-router';

import { useGroupById } from 'queries/groups';
import { ActionButton } from 'common/interaction';
import { Container } from 'common/layout';
import { Text } from 'common/typography';
import { GroupSafeword } from 'modules/groups';

export default function GroupScreen() {
  const router = useRouter();
  const params = useSearchParams<{ groupId: string }>();
  const { data: group } = useGroupById(params.groupId);

  if (!group) return null;

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

      <ActionButton
        style={{ marginTop: 32 }}
        direction="right"
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: '/home/[groupId]/send',
            params: {
              groupId: params.groupId,
            },
          })
        }
      >
        Safeword versturen
      </ActionButton>
    </Container>
  );
}
