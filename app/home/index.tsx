import * as React from 'react';

import { Group, GroupGrid } from 'modules/groups';

export default function HomeScreen() {
  return (
    <GroupGrid>
      <Group
        name="Familie Bakker"
        type="family"
        to="/home/familie-bakker"
      />
      <Group
        name="Label A + Ace"
        type="work"
        to="/home/labela-ace"
      />
    </GroupGrid>
  );
}
