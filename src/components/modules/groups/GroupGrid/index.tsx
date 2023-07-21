import { GroupGridContainer } from './styled';

export function GroupGrid({ children, groupsLength }: GroupGridProps) {
  return <GroupGridContainer groupsLength={groupsLength}>{children}</GroupGridContainer>;
}

export type GroupGridProps = {
  children: React.ReactNode;
  groupsLength: number;
};
