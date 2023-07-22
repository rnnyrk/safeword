import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const GroupMemberItem = styled(Animated.View)<GroupMemberItemProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : 16)}px;
`;

type GroupMemberItemProps = {
  isLast?: boolean;
};

export const GroupMemberItemText = styled.View`
  flex: 1;
  margin-right: 32px;
`;
