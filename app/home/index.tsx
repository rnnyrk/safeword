import { Text, View } from 'react-native';

import { getGroupsOfUser } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Group, GroupGrid } from 'modules/groups';

export default async function GroupsScreen() {
  return (
    <View>
      <Text>Groups</Text>
    </View>
  );

  // const { user } = useSupabase();

  // console.log({ GroupScreenUser: user });

  // if (!user) return null;

  // const { data: groups, error: getGroupsError } = await getGroupsOfUser(user?.id);

  // if (getGroupsError) {
  //   console.error(getGroupsError);
  // }

  // return (
  //   <GroupGrid>
  //     {groups
  //       ? groups.map((group) => (
  //           <Group
  //             key={group.id}
  //             name="Familie Bakker"
  //             type="family"
  //             group="familie-bakker"
  //           />
  //         ))
  //       : null}
  //   </GroupGrid>
  // );
}
