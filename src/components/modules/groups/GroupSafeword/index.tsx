import { windowWidth } from 'services';
import { Bubble } from 'common/svg';

import { GroupSafewordContent } from './styled';

export const GroupSafeword = () => {
  const groupSize = windowWidth - 40;

  return (
    <GroupSafewordContent groupSize={groupSize}>
      <Bubble
        $position="absolute"
        width={groupSize}
        height={groupSize}
      />
    </GroupSafewordContent>
  );
};
