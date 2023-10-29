import { Pressable } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

import { useGroupById } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { getNewSafeword, locales, windowWidth } from 'src/utils';
import { formatDate } from 'src/utils/dates';
import { AnimatedGroup, DotLoader } from 'common/layout';
import { BubbleStroke, Refresh } from 'common/svg';
import { Text } from 'common/typography';

import {
  GroupSafewordContent,
  GroupSafewordDate,
  GroupSafewordRefresh,
  GroupSafewordWord,
} from './styled';

export function GroupSafeword({ groupId }: GroupSafewordProps) {
  const { data: group, isPending: isLoadingGroup } = useGroupById(groupId);
  const { mutateAsync: onUpdateGroup } = useUpdateGroup();

  const groupSize = windowWidth - 4;

  async function onGenerateNewSafeword() {
    if (!group) return;

    const newSafeword = getNewSafeword(group.language);

    await onUpdateGroup({
      id: groupId,
      values: {
        current_word: newSafeword,
      },
    });
  }

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
            {locales.t('group.our_safeword')}
          </Text>
          <GroupSafewordWord>
            {isLoadingGroup ? (
              <DotLoader
                size="large"
                color="primary"
                style={{ position: 'absolute', width: '100%', height: 100, zIndex: 50 }}
              />
            ) : (
              <>
                <Text
                  color="primary"
                  size={56}
                  marginTop={24}
                  marginRight={8}
                  marginBottom={24}
                >
                  {group?.current_word}
                </Text>
                <Pressable onPress={onGenerateNewSafeword}>
                  {({ pressed }) => (
                    <GroupSafewordRefresh isPressed={pressed}>
                      <Refresh />
                    </GroupSafewordRefresh>
                  )}
                </Pressable>
              </>
            )}
          </GroupSafewordWord>
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
