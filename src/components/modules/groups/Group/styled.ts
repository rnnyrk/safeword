import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GroupProps } from '.';

export const GroupIcon = styled.View`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const GroupContent = styled(Animated.View)<GroupContentProps>`
  position: relative;
  z-index: 10;
  height: ${({ groupSize }) => groupSize + 'px'};
  width: ${({ groupSize }) => groupSize + 'px'};
  padding: ${({ size }) => (size === 'small' ? '20px' : '80px')} 24px 0 24px;
`;

type GroupContentProps = {
  size: GroupProps['size'];
  groupSize: number;
};
