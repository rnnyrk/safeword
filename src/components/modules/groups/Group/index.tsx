import type * as i from 'types';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

import { windowWidth } from 'src/utils';
import theme from 'styles/theme';
import { AnimatedGroup } from 'common/layout';
import { Bubble } from 'common/svg';
import { Text } from 'common/typography';

export function Group({ name, groupId, size = 'small', type }: GroupProps) {
  const router = useRouter();

  const isSmall = size === 'small';
  let groupSize = windowWidth - 40;

  if (isSmall) {
    groupSize = windowWidth / 2 - 10;
  }

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/home/[groupId]/',
          params: { groupId },
        })
      }
    >
      {({ pressed }) => {
        return (
          <AnimatedGroup
            size={groupSize}
            center
            entering={FadeInUp.duration(750).delay(250)}
          >
            <View
              style={{
                position: 'relative',
                zIndex: 50,
                paddingRight: 8,
                paddingLeft: 8,
              }}
            >
              <Text
                color="white"
                align="center"
                size={isSmall ? 20 : 40}
                style={{ marginTop: isSmall ? -15 : -30 }}
              >
                {name}
              </Text>
            </View>
            <Bubble
              $position="absolute"
              fill={pressed ? theme.colors.primaryHover : theme.colors.primary}
              width={groupSize}
              height={groupSize}
            />
          </AnimatedGroup>
        );
      }}
    </Pressable>
  );
}

export type GroupProps = {
  name: string;
  size?: 'small' | 'large';
  type?: i.GroupType;
  groupId: string;
};
