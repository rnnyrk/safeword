import * as React from 'react';
import { Text } from 'react-native';

import { CenterContainer, CenterText } from 'common/layout/CenterContainer';
import { Button } from 'common/interaction/Button';

export default function HomeScreen() {
  return (
    <CenterContainer>
      <CenterText>Home</CenterText>
      <Button>
        <Text>Click me</Text>
      </Button>
    </CenterContainer>
  );
};
