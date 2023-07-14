import { Group, GroupGrid } from 'modules/groups';

export default function HomeScreen() {
  return (
    <GroupGrid>
      <Group
        name="Familie Bakker"
        type="family"
        group="familie-bakker"
      />
      <Group
        name="Label A + Ace"
        type="work"
        group="labela-ace"
      />
    </GroupGrid>
  );
}
