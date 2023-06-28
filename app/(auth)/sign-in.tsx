import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';

import { supabase, supabaseUrl } from 'services';
import { useAuth } from 'services/authContext';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function RootScreen() {
  const authContext = useAuth();

  const [req, _, promptAsync] = Google.useAuthRequest(
    {
      iosClientId: '11857337877-aohs4qq6d8csap1cgkcrvf6tdt6ggtsh.apps.googleusercontent.com',
      androidClientId: '11857337877-aohs4qq6d8csap1cgkcrvf6tdt6ggtsh.apps.googleusercontent.com',
    },
    {
      projectNameForProxy: 'rnnyrk/safeword',
    },
  );

  const onGoogleSignIn = async () => {
    if (!authContext) return;

    try {
      const response = await promptAsync({
        url: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${req?.redirectUri}`,
      });

      if (response.type === 'error') {
        console.log({ errorResponse: response });
      }

      console.log({ googleRes: response });

      // After we got refresh token with the response, we can send it to supabase to sign-in the user
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        // refreshToken: res.params.refresh_token,
      });

      if (error) {
        console.error('Google signInWithOAuth error', { error });
      }

      console.log({ googleData: data });

      // authContext.signIn({
      //   email: data?.user?.email,
      //   token: data?.access_token,
      // });
    } catch (err: any) {
      console.error({ err });
    }
  };

  const onAppleSignIn = async () => {
    if (!authContext) return;

    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log({
        appleRes: response,
        // must be tested on real device
        credentialState: await AppleAuthentication.getCredentialStateAsync(response.user),
        token: response.identityToken,
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        // refreshToken: res.params.refresh_token,
      });

      if (error) {
        console.error('Apple signInWithOAuth error', { error });
      }

      authContext.signIn({
        email: response.email,
        token: response.identityToken!,
      });
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.error({ err });
      } else {
        // handle other errors
        console.error({ err });
      }
    }
  };

  return (
    <>
      <LogoHeader />
      <Container>
        <Button onPress={() => onGoogleSignIn()}>
          <Text color="white">Sign in with Google</Text>
        </Button>
        <Button onPress={() => onAppleSignIn()}>
          <Text color="white">Sign in with Apple</Text>
        </Button>
      </Container>
    </>
  );
}
