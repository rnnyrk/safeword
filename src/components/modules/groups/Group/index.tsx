import * as i from 'types';

import theme from 'styles/theme';
import { Bubble, Lock } from 'common/svg';
import { Text } from 'common/typography';

import { GroupContainer, GroupContent } from './styled';

export const Group = ({ name, type }: GroupProps) => {
  return (
    <GroupContainer>
      <GroupContent>
        <Lock
          width={50}
          height={50}
          fill={theme.colors.gray}
        />
        <Text
          color="primary"
          size={40}
          style={{ marginTop: 30 }}
        >
          {name}
        </Text>
      </GroupContent>
      <Bubble
        $position="absolute"
        width={400}
        height={400}
      />
    </GroupContainer>
  );
};

type GroupProps = {
  name: string;
  type: i.GroupType;
};
