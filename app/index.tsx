import * as React from 'react';
import { Stack } from 'expo-router';

import { LogoHeader } from 'common/layout';
import { Group, GroupGrid } from 'modules/groups';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <LogoHeader />,
        }}
      />
      <GroupGrid>
        <Group
          name="Familie Bakker"
          type="family"
        />
        <Group
          name="Label A + Ace"
          type="work"
        />
      </GroupGrid>
    </>
  );
}
