import { FadeInUp } from 'react-native-reanimated';

import { windowWidth } from 'services';
import { Bubble } from 'common/svg';

import { GroupSafewordContent } from './styled';

export const GroupSafeword = () => {
  const groupSize = windowWidth - 40;

  return (
    <GroupSafewordContent
      groupSize={groupSize}
      entering={FadeInUp.duration(750).delay(250)}
    >
      <Bubble
        $position="absolute"
        width={groupSize}
        height={groupSize}
      />
    </GroupSafewordContent>
  );
};
