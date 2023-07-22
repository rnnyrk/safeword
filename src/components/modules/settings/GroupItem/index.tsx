import { Alert, Pressable } from 'react-native';
import { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';

import { useGroupById } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { useSupabase } from 'utils/SupabaseContext';
import { Min } from 'common/svg';
import { Text } from 'common/typography';

import { GroupMemberItem, GroupMemberItemText } from './styled';

export function GroupItem({ groupId }: GroupItemProps) {
  const { user } = useSupabase();
  const { data: group } = useGroupById(groupId);
  const { mutateAsync: onUpdateGroup, isLoading: isUpdating } = useUpdateGroup();

  async function onRemoveUserFromGroup(name: string, memberId: string) {
    Alert.alert('Uit de groep zetten', `Weet je zeker dat je ${name} uit de groep wilt zetten?`, [
      {
        text: 'Annuleren',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (!group?.members) return;

          const newGroupMembers = group.members.filter((member) => member.id !== memberId);

          await onUpdateGroup({
            id: group.id,
            values: {
              members: newGroupMembers.map((member) => member.id).join(','),
            },
          });

          // @TODO toast on error?
        },
      },
    ]);
  }

  if (!group || !user) return null;

  return (
    <>
      {group.members.map((member, index) => {
        const isLast = index === group.members.length - 1;
        const isAdmin = member.id === group.admin_id;
        const isLoggedInAdmin = user.id === group.admin_id;

        return (
          <GroupMemberItem
            key={`members_${index}`}
            isLast={isLast}
            entering={FadeInUp}
            exiting={FadeOutDown}
            layout={Layout.springify()}
          >
            <GroupMemberItemText>
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
            </GroupMemberItemText>
            {isLoggedInAdmin && !isAdmin ? (
              <Pressable
                onPress={() => onRemoveUserFromGroup(member.name, member.id)}
                disabled={isUpdating}
              >
                <Min
                  width={24}
                  height={24}
                  style={isUpdating ? { opacity: 0.5 } : null}
                />
              </Pressable>
            ) : null}
          </GroupMemberItem>
        );
      })}
    </>
  );
}

type GroupItemProps = {
  groupId: string;
};
