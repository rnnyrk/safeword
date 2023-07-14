import { GroupGridContainer } from './styled';

export function GroupGrid({ children }: GroupGridProps) {
  return <GroupGridContainer>{children}</GroupGridContainer>;
};

type GroupGridProps = {
  children: React.ReactNode;
};
