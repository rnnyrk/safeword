import * as React from 'react';
import { Text } from 'react-native';
import Constants from 'expo-constants';

import { CenterContainer, CenterText } from 'common/layout';

export default function EnvironmentScreen() {
  // process.env.API_URL load the variable directly from eas.json but this doesn;t work on a developer server;
  const apiUrl = process.env.API_URL;
  // Therefor it might be better to use these which loads the data from app.js, but is a bit more ugly;
  const Constantstest = Constants?.expoConfig?.extra?.apiUrl;

  return (
    <CenterContainer>
      <CenterText>Environmental Variables</CenterText>
      <Text>Process: {apiUrl}</Text>
      <Text>Constants: {Constantstest}</Text>
    </CenterContainer>
  );
};
