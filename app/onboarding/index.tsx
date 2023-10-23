import { useRouter } from 'expo-router';

import { locales } from 'utils';
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
          {locales.t('onboarding.welcome')} {user?.name || user?.email}!
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={20}
          fontFamily={400}
          style={{ marginTop: 8, marginBottom: 16 }}
        >
          {locales.t('onboarding.description')}
        </Text>

        <Button
          onPress={() => router.push('/onboarding/create-group')}
          style={OnboardingButtonStyle}
        >
          <Text color="white">{locales.t('onboarding.create_group')}</Text>
        </Button>
        <Button
          onPress={() => router.push('/onboarding/join-group')}
          style={OnboardingButtonStyle}
        >
          <Text color="white">{locales.t('onboarding.join_group')}</Text>
        </Button>
      </Container>
    </>
  );
}
