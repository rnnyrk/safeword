import { ExpoConfig } from 'expo/config';

module.exports = {
  scheme: 'comsafeword',
  name: 'SafeWord',
  slug: 'safeword',
  originalFullName: 'rnnyrk/safeword',
  currentFullName: 'rnnyrk/safeword',
  version: '1.0.0',
  updates: {
    url: 'https://u.expo.dev/f2bf9a40-fc96-45d0-8a9c-1c3af0e39835',
  },
  android: {
    package: 'com.safeword',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
  ios: {
    bundleIdentifier: 'com.safeword',
    runtimeVersion: '1.0.0',
    associatedDomains: ['applinks:dev.getsafeword.app', 'applinks:getsafeword.app'],
    config: {
      usesNonExemptEncryption: false,
    },
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
  },
  plugins: [
    [
      'expo-router',
      {
        asyncRoutes: {
          default: 'development',
          android: false,
        },
        origin: 'https://dev.getsafeword.app',
      },
    ],
    [
      'expo-build-properties',
      {
        ios: {
          flipper: true,
        },
      },
    ],
  ],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  owner: 'ronnyrr',
} as ExpoConfig;
