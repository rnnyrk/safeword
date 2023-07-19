import { useRouter } from 'expo-router';

import { useSupabase } from 'utils/SupabaseContext';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function OnboardingScreen() {
  const router = useRouter();
  const { user } = useSupabase();

  if (!user) return null;

  return (
    <>
      <LogoHeader />
      <Container>
        <Text
          align="center"
          color="darkGray"
          size={24}
        >
          Welkom {user?.name || user?.email}!
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
          onPress={() => router.push('/onboarding/create-group')}
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
