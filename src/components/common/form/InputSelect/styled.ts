import { Text, View } from 'react-native';
import styled from 'styled-components';

export const ExtendedText = styled(Text)`
  width: 100%;
  height: 72px;
  padding: 37px 16px 8px;
  font-family: ${({ theme }) => theme.fonts.LexendDeca[400]};
  color: ${({ theme }) => theme.colors.black};
`;

export const IconContainer = styled(View)`
  position: absolute;
  top: 28px;
  right: 20px;
`;

export const HiddenInput = styled(View)`
  width: 0;
  height: 0;
`;
