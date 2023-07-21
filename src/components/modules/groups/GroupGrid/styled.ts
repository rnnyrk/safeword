import styled from 'styled-components/native';

import { type GroupGridProps } from './';

export const GroupGridContainer = styled.View<GroupGridContainerProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ groupsLength }) => (groupsLength > 1 ? 'space-between' : 'center')};
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

type GroupGridContainerProps = Pick<GroupGridProps, 'groupsLength'>;
