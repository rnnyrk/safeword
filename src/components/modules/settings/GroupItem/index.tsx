import { View } from 'react-native';

import { useGroupById } from 'queries/groups';
import { useSupabase } from 'utils/SupabaseContext';
import { Text } from 'common/typography';

export function GroupItem({ groupId }: GroupItemProps) {
  const { user } = useSupabase();
  const { data: group } = useGroupById(groupId);

  if (!group || !user) return null;

  return (
    <>
      {group.members.map((member, index) => {
        const isLast = index === group.members.length - 1;
        const isAdmin = member.id === group.admin_id;

        return (
          <View
            key={`members_${index}`}
            style={{ marginBottom: isLast ? 0 : 16 }}
          >
            <Text
              size={16}
              color={isAdmin ? 'primary' : 'black'}
            >
              {member.name} {isAdmin ? `(beheerder)` : null}
            </Text>
            <Text
              size={16}
              color="darkGray"
            >
              {member.email}
            </Text>
          </View>
        );
      })}
    </>
  );
}

type GroupItemProps = {
  groupId: string;
};
