import path from 'path';
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  scheme: Env.BUNDLE_ID,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  slug: 'safeword',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: path.resolve(__dirname, 'src/assets/images/icon.png'),
  userInterfaceStyle: 'automatic',
  splash: {
    image: path.resolve(__dirname, 'src/assets/images/splash.png'),
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: Env.BUNDLE_ID,
    buildNumber: Env.BUILD_VERSION.toString(),
    associatedDomains: ['applinks:dev.getsafeword.app', 'applinks:getsafeword.app'],
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: path.resolve(__dirname, 'src/assets/images/adaptive-icon.png'),
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
    versionCode: Env.BUILD_VERSION,
  },
  plugins: [
    [
      'expo-router',
      {
        origin: 'https://dev.getsafeword.app',
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: Env.APP_ENV === 'production' ? false : true,
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
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
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
