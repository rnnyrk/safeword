import { EdgeInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const OnboardingContent = styled.View`
  flex: 1;
  justify-content: center;
  width: 100%;
`;

export const OnboardingAction = styled.View<OnboardingActionProps>`
  width: 100%;
  align-items: center;
  padding-bottom: ${({ insets }) => insets.bottom + 16}px;
`;

type OnboardingActionProps = {
  insets: EdgeInsets;
};

export const OnboardingLayout = {
  Action: OnboardingAction,
  Content: OnboardingContent,
};
