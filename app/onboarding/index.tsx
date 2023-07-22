import { useRouter } from 'expo-router';

import { useSupabase } from 'utils/SupabaseContext';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

const OnboardingButtonStyle = {
  width: 300,
  height: 64,
  marginTop: 16,
};

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
          color="primary"
          size={24}
        >
          Welkom {user?.name || user?.email}!
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={20}
          fontFamily={400}
          style={{ marginTop: 8, marginBottom: 16 }}
        >
          Wat wil je als eerste doen?
        </Text>

        <Button
          onPress={() => router.push('/onboarding/create-group')}
          style={OnboardingButtonStyle}
        >
          <Text color="white">Een groep aanmaken</Text>
        </Button>
        <Button
          onPress={() => router.push('/onboarding/join-group')}
          style={OnboardingButtonStyle}
        >
          <Text color="white">Een groep joinen</Text>
        </Button>
      </Container>
    </>
  );
}
