import * as React from 'react';

import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function Onboarding() {
  function onCreateGroup() {
    console.log('test');
  }

  return (
    <>
      <LogoHeader />
      <Container>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 24 }}
        >
          Welkom Bart!
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 8 }}
        >
          Wat wil je als eerste doen?
        </Text>
        <Button
          onPress={onCreateGroup}
          variant="secondary"
          style={{ width: 300, marginTop: 16 }}
        >
          <Text color="primary">Een groep aanmaken</Text>
        </Button>
        <Button
          onPress={onCreateGroup}
          variant="secondary"
          style={{ width: 300, marginTop: 16 }}
        >
          <Text color="primary">Een groep joinen</Text>
        </Button>
      </Container>
    </>
  );
}
