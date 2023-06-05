import * as React from 'react';
import { Stack } from 'expo-router';

import { LogoHeader } from 'common/layout';
import { CenterContainer } from 'common/layout/CenterContainer';
import { Group } from 'modules/groups/Group';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <LogoHeader />,
        }}
      />
      <CenterContainer>
        <Group
          name="Familie Bakker"
          type="work"
        />
      </CenterContainer>
    </>
  );
}
