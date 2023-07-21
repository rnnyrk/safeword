import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

import { useGroupById } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { getNewSafeword, windowWidth } from 'src/utils';
import { formatDate } from 'src/utils/dates';
import { AnimatedGroup } from 'common/layout';
import { BubbleStroke, Refresh } from 'common/svg';
import { Text } from 'common/typography';

import { GroupSafewordContent, GroupSafewordDate, GroupSafewordWord } from './styled';

export function GroupSafeword({ groupId }: GroupSafewordProps) {
  const router = useRouter();
  const { data: group, isLoading } = useGroupById(groupId);
  const { mutateAsync: onUpdateGroup, isLoading: isUpdating } = useUpdateGroup();

  async function onGenerateNewSafeword() {
    const newSafeword = getNewSafeword();

    await onUpdateGroup({
      id: groupId,
      values: {
        current_word: newSafeword,
      },
    });
  }

  const groupSize = windowWidth - 20;

  return (
    <>
      <GroupSafewordDate>
        <Text
          color="gray"
          size={18}
        >
          {formatDate()}
        </Text>
      </GroupSafewordDate>
      <AnimatedGroup
        size={groupSize}
        entering={FadeInUp.duration(750).delay(250)}
        exiting={FadeInUp.duration(750).delay(250)}
      >
        <GroupSafewordContent style={{ position: 'relative', zIndex: 50 }}>
          <Text
            color="darkGray"
            size={20}
          >
            Ons SafeWord is
          </Text>
          <GroupSafewordWord>
            <Text
              color="primary"
              size={56}
              marginTop={24}
              marginRight={8}
              marginBottom={24}
            >
              {isUpdating || isLoading ? '...' : group?.current_word}
            </Text>
            <Pressable onPress={onGenerateNewSafeword}>
              <Refresh />
            </Pressable>
          </GroupSafewordWord>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/home/[groupId]/send',
                params: {
                  groupId,
                },
              })
            }
          >
            <Text
              color="gray"
              size={16}
            >
              Safeword versturen
            </Text>
          </Pressable>
        </GroupSafewordContent>

        <BubbleStroke
          $position="absolute"
          width={groupSize}
          height={groupSize}
        />
      </AnimatedGroup>
    </>
  );
}

type GroupSafewordProps = {
  groupId: string;
};
