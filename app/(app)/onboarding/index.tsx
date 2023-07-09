import * as React from 'react';
import { useRouter } from 'expo-router';

import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function Onboarding() {
  const router = useRouter();

  return (
    <>
      <LogoHeader />
      <Container>
        <Text
          align="center"
          color="darkGray"
          size={24}
        >
          Welkom Bart!
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 4 }}
        >
          Wat wil je als eerste doen?
        </Text>

        <Button
          // onPress={() => router.push('/onboarding/create-group')}
          onPress={() => router.push('/onboarding/invite-members?code=TES_EST')}
          variant="secondary"
          style={{ width: 300, marginTop: 16 }}
        >
          <Text color="primary">Een groep aanmaken</Text>
        </Button>
        <Button
          onPress={() => router.push('/onboarding/join-group')}
          variant="secondary"
          style={{ width: 300, marginTop: 16 }}
        >
          <Text color="primary">Een groep joinen</Text>
        </Button>
      </Container>
    </>
  );
}
