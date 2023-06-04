import * as React from 'react';

import { CenterContainer } from 'common/layout/CenterContainer';
import { Group } from 'modules/groups/Group';

export default function HomeScreen() {
  return (
    <CenterContainer>
      <Group
        name="Familie Bakker"
        type="family"
      />
    </CenterContainer>
  );
};
