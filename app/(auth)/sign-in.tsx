import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';

import { googleSignIn, supabase, supabaseUrl } from 'services';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function RootScreen() {
  const router = useRouter();

  const [req, _res, promptAsync] = Google.useAuthRequest(
    {
      // expoClientId: '',
      iosClientId: '11857337877-aohs4qq6d8csap1cgkcrvf6tdt6ggtsh.apps.googleusercontent.com',
      androidClientId: '11857337877-aohs4qq6d8csap1cgkcrvf6tdt6ggtsh.apps.googleusercontent.com',
    },
    {
      projectNameForProxy: 'rnnyrk/safeword',
    },
  );

  const onGoogleSignIn = () => {
    promptAsync({
      url: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${req?.redirectUri}`,
    })
      .then(async (res) => {
        // After we got refresh token with the response, we can send it to supabase to sign-in the user
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          // refreshToken: res.params.refresh_token,
        });

        if (error) console.log({ error });

        console.log({ data });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <>
      <LogoHeader />
      <Container>
        <Button onPress={() => onGoogleSignIn()}>
          <Text color="white">Sign in with Google</Text>
        </Button>
      </Container>
    </>
  );
}
