import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components';

export const AnimatedGroup = styled(Animated.View)<AnimatedGroupProps>`
  position: relative;
  margin-bottom: 12px;
  height: ${({ size }) => size + 'px'};
  width: ${({ size }) => size + 'px'};

  ${({ center }) =>
    center &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

type AnimatedGroupProps = {
  size: number;
  center?: boolean;
};
