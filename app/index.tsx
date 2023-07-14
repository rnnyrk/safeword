import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

import { getApplicationId, isIphone, SecureStoreAdapter } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Apple, Gsuite } from 'common/svg';
import { Text } from 'common/typography';

export default function AuthScreen() {
  const { getAppleOAuthUrl, getGoogleOAuthUrl, setOAuthSession } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  function extractParamsFromUrl(url: string) {
    const params = new URLSearchParams(url.split('#')[1]);
    const data = {
      access_token: params.get('access_token'),
      expires_in: parseInt(params.get('expires_in') || '0'),
      refresh_token: params.get('refresh_token'),
      token_type: params.get('token_type'),
      provider_token: params.get('provider_token'),
    };

    return data;
  }

  async function onSignInWithGoogle() {
    setLoading(true);

    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(url, 'com.safeword://home', {
        showInRecents: true,
      });

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Google's access token if you need it later
        SecureStoreAdapter.setItem('google-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSignInWithApple() {
    setLoading(true);

    try {
      const url = await getAppleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(url, 'com.safeword://home', {
        showInRecents: true,
      });

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Apple access token if you need it later
        SecureStoreAdapter.setItem('apple-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LogoHeader />
      <Container>
        <Button
          onPress={onSignInWithGoogle}
          disabled={loading}
          variant="social"
        >
          <Gsuite
            width={20}
            height={20}
            style={{ marginRight: 8 }}
          />
          <Text>{loading ? 'Loading...' : 'Sign in with Google'}</Text>
        </Button>
        {isIphone && (
          <Button
            onPress={onSignInWithApple}
            disabled={loading}
            variant="social"
          >
            <Apple
              width={20}
              height={20}
              style={{ marginRight: 8 }}
            />
            <Text>{loading ? 'Loading...' : 'Sign in with Apple'}</Text>
          </Button>
        )}
      </Container>
    </>
  );
}