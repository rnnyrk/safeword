import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIphone, SecureStoreAdapter } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Button } from 'common/interaction';
import { Container, FormLayout, LogoHeader } from 'common/layout';
import { Apple, Gsuite } from 'common/svg';
import { Text } from 'common/typography';

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { getAppleOAuthUrl, getGoogleOAuthUrl, setOAuthSession } = useSupabase();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  function onOpenLink(type: 'terms' | 'privacy') {
    const url =
      type === 'terms' ? 'https://getsafeword.app/terms' : 'https://getsafeword.app/privacy';

    WebBrowser.openBrowserAsync(url);
  }

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

      const result = await WebBrowser.openAuthSessionAsync(url, 'com.safeword://', {
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

      const result = await WebBrowser.openAuthSessionAsync(url, 'com.safeword://', {
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
      <StatusBar style="dark" />
      <LogoHeader />
      <Container alignItems="flex-start">
        <FormLayout.Content>
          <Text
            color="primary"
            size={28}
          >
            Welkom bij SafeWord
          </Text>
          <Text
            color="primaryLight"
            fontFamily={400}
            size={18}
            style={{ marginTop: 2 }}
          >
            Realtime verificatie voor elk gesprek.
          </Text>
          <View
            style={{
              marginTop: 24,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <Text
              color="darkGray"
              size={18}
              fontFamily={400}
            >
              Maak nu een account aan en probeer het zelf, bij het maken van een account ga je
              akkoord met onze{' '}
            </Text>
            <Text
              color="primary"
              size={18}
              fontFamily={400}
              onPress={() => onOpenLink('terms')}
            >
              algemene voorwaarden
            </Text>
            <Text
              color="darkGray"
              size={18}
              fontFamily={400}
            >
              {' '}
              en{' '}
            </Text>
            <Text
              color="primary"
              size={18}
              fontFamily={400}
              onPress={() => onOpenLink('privacy')}
            >
              privacy statement
            </Text>
            <Text
              color="darkGray"
              size={18}
              fontFamily={400}
            >
              .
            </Text>
          </View>
        </FormLayout.Content>

        <FormLayout.Action insets={insets}>
          <Button
            onPress={onSignInWithGoogle}
            isDisabled={isLoading}
            isLoading={isLoading}
            variant="social"
            icon={
              <Gsuite
                width={19}
                height={19}
                style={{ marginRight: 32 }}
              />
            }
          >
            <Text>Inloggen met Google</Text>
          </Button>
          {isIphone && (
            <Button
              onPress={onSignInWithApple}
              isDisabled={isLoading}
              isLoading={isLoading}
              variant="social"
              icon={
                <Apple
                  width={20}
                  height={22}
                  style={{ marginRight: 32 }}
                />
              }
            >
              <Text>Inloggen met Apple</Text>
            </Button>
          )}
        </FormLayout.Action>
      </Container>
    </>
  );
}
