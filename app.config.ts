import { ExpoConfig } from 'expo/config';

module.exports = {
  scheme: 'com.safeword',
  name: 'SafeWord',
  slug: 'safeword',
  originalFullName: 'rnnyrk/safeword',
  currentFullName: 'rnnyrk/safeword',
  version: '1.0.0',
  updates: {
    url: 'https://u.expo.dev/f2bf9a40-fc96-45d0-8a9c-1c3af0e39835',
  },
  android: {
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
  ios: {
    runtimeVersion: '1.0.0',
  },
  icon: './src/assets/images/icon.png',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  extra: {
    eas: {
      projectId: 'f2bf9a40-fc96-45d0-8a9c-1c3af0e39835',
    },
    SUPABASE_URL: 'https://ksphcwnvuhkctwviucjp.supabase.co',
    SUPABASE_PUBLIC_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcGhjd252dWhrY3R3dml1Y2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxMjQyMzUsImV4cCI6MjAwMTcwMDIzNX0.VGXbow3jlSqVEhsgj51B6N5ygfW9W0qU4HvWHWFl-wI',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          flipper: true,
        },
      },
    ],
  ],
  owner: 'ronnyrr',
} as ExpoConfig;
