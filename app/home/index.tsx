import { useGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Group, GroupGrid } from 'modules/groups';

export default function GroupsScreen() {
  const { user } = useSupabase();
  const { data: groups } = useGroupsOfUser(user?.id);

  console.log({ groups, user });

  return (
    <GroupGrid>
      {groups && groups
        ? groups.map((group) => (
            <Group
              key={group.id}
              name={group.name}
              groupId={group.id}
              size={groups.length > 1 ? 'small' : 'large'}
            />
          ))
        : null}
    </GroupGrid>
  );
}
