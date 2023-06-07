import { useRouter } from 'expo-router';

import { Button } from 'common/interaction/Button';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function RootScreen() {
  const router = useRouter();

  return (
    <>
      <LogoHeader />
      <Container>
        <Text
          align="center"
          color="darkGray"
          size={48}
        >
          Auth / Welcome
        </Text>
        {/* Use replace to prevent going back to Auth <Button onPress={() => router.replace('/home')}> */}
        <Button onPress={() => router.push('/home')}>
          <Text>Ga naar home</Text>
        </Button>
      </Container>
    </>
  );
}
