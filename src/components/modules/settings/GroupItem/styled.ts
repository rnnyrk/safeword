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

export const GroupMemberItemText = styled.View<GroupMemberItemTextProps>`
  flex: 1;
  margin-right: ${({ isLoggedInAdmin }) => (isLoggedInAdmin ? 32 : 0)}px;
`;

type GroupMemberItemTextProps = {
  isLoggedInAdmin: boolean;
};
