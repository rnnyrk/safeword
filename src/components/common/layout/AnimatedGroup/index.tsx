import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components';

export const AnimatedGroup = styled(Animated.View)<AnimatedGroupProps>`
  position: relative;
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
