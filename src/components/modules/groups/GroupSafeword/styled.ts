import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const GroupSafewordContent = styled(Animated.View)<GroupSafewordContentProps>`
  position: relative;
  z-index: 10;
  height: ${({ groupSize }) => groupSize + 'px'};
  width: ${({ groupSize }) => groupSize + 'px'};
  padding: 80px 24px 0 24px;
`;

type GroupSafewordContentProps = {
  groupSize: number;
};
