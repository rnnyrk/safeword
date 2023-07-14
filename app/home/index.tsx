import type * as i from 'types';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Group, GroupGrid } from 'modules/groups';

export default function GroupsScreen() {
  const { user } = useSupabase();
  const [groups, setGroups] = useState<i.FormattedGroup[] | null>(null);

  async function fetchGroups() {
    console.log({ GroupScreenUser: user });
    if (user) {
      const { data: gg, error: getGroupsError } = await getGroupsOfUser(user?.id);

      if (getGroupsError) {
        console.error(getGroupsError);
      }

      setGroups(gg);
    }
  }

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  console.log({ groups });

  return (
    <GroupGrid>
      {groups
        ? groups.map((group) => (
            <Group
              key={group.id}
              name={group.name}
              group={group.name.toLowerCase().replace(/\s/g, '-')}
              size={groups.length > 1 ? 'small' : 'large'}
            />
          ))
        : null}
    </GroupGrid>
  );
}
