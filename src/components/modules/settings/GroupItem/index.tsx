import { Alert, Pressable } from 'react-native';
import { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';

import { useGroupById } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { useSupabase } from 'utils/SupabaseContext';
import { useToast } from 'common/interaction';
import { Min } from 'common/svg';
import { Text } from 'common/typography';

import { GroupMemberItem, GroupMemberItemText } from './styled';

export function GroupItem({ groupId }: GroupItemProps) {
  const { user } = useSupabase();
  const toast = useToast();

  const { data: group } = useGroupById(groupId);
  const { mutateAsync: onUpdateGroup, isLoading: isUpdating } = useUpdateGroup();

  async function onRemoveUserFromGroup(name: string, memberId: string) {
    Alert.alert('Uit de groep zetten', `Weet je zeker dat je ${name} uit de groep wilt zetten?`, [
      {
        text: 'Annuleren',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (!group?.members) return;

          const newGroupMembers = group.members.filter((member) => member.id !== memberId);

          const { error: updateGroupError } = await onUpdateGroup({
            id: group.id,
            values: {
              members: newGroupMembers.map((member) => member.id).join(','),
            },
          });

          if (!updateGroupError) {
            toast.show({ message: 'Gebruiker verwijderen mislukt' });
            console.error('Error updating group after removing user');
            return;
          }
        },
      },
    ]);
  }

  if (!group || !user) return null;

  return (
    <>
      {group.members.map((member, index) => {
        const isLast = index === group.members.length - 1;
        const isAdminRow = member.id === group.admin_id;
        const isLoggedInAdmin = user.id === group.admin_id;

        return (
          <GroupMemberItem
            key={`members_${index}`}
            isLast={isLast}
            entering={FadeInUp}
            exiting={FadeOutDown}
            layout={Layout.springify()}
          >
            <GroupMemberItemText isLoggedInAdmin={isLoggedInAdmin}>
              <Text
                size={16}
                color={isAdminRow ? 'primary' : 'black'}
              >
                {member.name} {isAdminRow ? `(beheerder)` : null}
              </Text>
              <Text
                size={16}
                color="darkGray"
                fontFamily={400}
              >
                {member.email}
              </Text>
            </GroupMemberItemText>
            {isLoggedInAdmin && !isAdminRow ? (
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
