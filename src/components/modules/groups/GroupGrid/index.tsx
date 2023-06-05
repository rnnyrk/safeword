import { GroupGridContainer } from './styled';

export const GroupGrid = ({ children }: GroupGridProps) => {
  return <GroupGridContainer>{children}</GroupGridContainer>;
};

type GroupGridProps = {
  children: React.ReactNode;
};
