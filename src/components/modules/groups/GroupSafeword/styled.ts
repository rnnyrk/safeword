import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const GroupSafewordContainer = styled(Animated.View)<GroupSafewordContainerProps>`
  height: ${({ groupSize }) => groupSize + 'px'};
  width: ${({ groupSize }) => groupSize + 'px'};
  margin-bottom: 24px;
`;

type GroupSafewordContainerProps = {
  groupSize: number;
};

export const GroupSafewordContent = styled.View`
  position: relative;
  z-index: 50;
  align-items: center;
  padding: 88px 24px 0px 24px;
  height: 100%;
`;

export const GroupSafewordWord = styled.View`
  flex-direction: row;
  align-items: center;
`;
