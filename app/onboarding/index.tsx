import * as React from 'react';

import { Container } from 'common/layout';
import { Text } from 'common/typography';

export default function Onboarding() {
  return (
    <Container>
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 24 }}
      >
        Welkom Bart!
      </Text>
      <Text
        align="center"
        color="darkGray"
        size={48}
        style={{ marginTop: 8 }}
      >
        Wat wil je als eerste doen?
      </Text>
    </Container>
  );
}
