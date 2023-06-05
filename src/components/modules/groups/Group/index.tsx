import * as i from 'types';

import { windowWidth } from 'services';
import theme from 'styles/theme';
import { Bubble, Lock, Work } from 'common/svg';
import { Text } from 'common/typography';

import { GroupContainer, GroupContent, GroupIcon } from './styled';

export const Group = ({ name, size = 'small', type }: GroupProps) => {
  const isSmall = size === 'small';

  let groupSize = windowWidth - 40;
  if (isSmall) {
    groupSize = windowWidth / 2 - 10;
  }

  return (
    <GroupContainer>
      <GroupContent
        groupSize={groupSize}
        size={size}
      >
        <GroupIcon>
          {type === 'family' && (
            <Lock
              width={isSmall ? 15 : 20}
              height={isSmall ? 30 : 40}
              fill={theme.colors.gray}
            />
          )}
          {type === 'work' && (
            <Work
              width={isSmall ? 25 : 30}
              height={isSmall ? 30 : 40}
              fill={theme.colors.gray}
            />
          )}
        </GroupIcon>
        <Text
          color="primary"
          align="center"
          size={isSmall ? 20 : 40}
          style={{ marginTop: isSmall ? 15 : 30 }}
        >
          {name}
        </Text>
      </GroupContent>
      <Bubble
        $position="absolute"
        width={groupSize}
        height={groupSize}
      />
    </GroupContainer>
  );
};

export type GroupProps = {
  name: string;
  size?: 'small' | 'large';
  type: i.GroupType;
};
