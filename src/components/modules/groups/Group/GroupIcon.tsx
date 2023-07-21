import theme from 'styles/theme';
import { Lock, Work } from 'common/svg';

import { type GroupProps } from '.';
import { GroupIconContainer } from './styled';

export function GroupIcon({ size, type }: Pick<GroupProps, 'type' | 'size'>) {
  const isSmall = size === 'small';

  return (
    <GroupIconContainer>
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
    </GroupIconContainer>
  );
}
