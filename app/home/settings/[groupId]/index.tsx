import { useRouter, useSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupById } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { useUpdateUser } from 'queries/users/mutate';
import theme from 'styles/theme';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, List, useToast } from 'common/interaction';
import { Container, FormLayout } from 'common/layout';
import { Min } from 'common/svg';
import { Text } from 'common/typography';

export default function SettingsGroupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useSearchParams<{ groupId: string }>();
  const { user } = useSupabase();
  const toast = useToast();

  const { data: group } = useGroupById(params.groupId);
  const { mutateAsync: onUpdateGroup, isLoading: isUpdatingGroup } = useUpdateGroup();
  const { mutateAsync: onUpdateUser, isLoading: isUpdatingUser } = useUpdateUser();

  const isUpdating = isUpdatingGroup || isUpdatingUser;

  async function onRemoveUserFromGroup(name: string, removeMemberId: string) {
    Alert.alert('Uit de groep zetten', `Weet je zeker dat je ${name} uit de groep wilt zetten?`, [
      {
        text: 'Annuleren',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (!group?.members) return;

          const newGroupMembers = group.members.filter((member) => member.id !== removeMemberId);
          const removeMember = group.members.find((member) => member.id === removeMemberId);

          if (!removeMember) {
            console.error('Could not find member to remove');
            return;
          }

          const { error: updateGroupError } = await onUpdateGroup({
            id: group.id,
            values: {
              members: newGroupMembers.map((member) => member.id).join(','),
            },
          });

          // @TODO werkt niet door RLS op users tabel update == op email match
          const { data: updatedUser, error: updateUserError } = await onUpdateUser({
            email: removeMember.email,
            values: {
              group_1: null,
            },
          });

          if (updateGroupError || updateUserError) {
            toast.show({ message: 'Gebruiker verwijderen mislukt' });
            console.error('Error updating group after removing user');
            return;
          }
        },
      },
    ]);
  }

  async function onRegenerateGroupCode() {}

  if (!group || !user) return null;

  return (
    <Container
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <FormLayout.Content>
        <ScrollView style={{ paddingTop: 64 }}>
          <Text
            color="primaryLight"
            marginBottom={4}
            size={32}
          >
            {group?.name}
          </Text>
          <Text
            size={16}
            fontFamily={400}
            marginBottom={32}
          >
            Beheer je groepsleden, of genereer een nieuwe groepscode om mensen bij je groep te
            voegen.
          </Text>

          {group.members.map((member, index) => {
            const isLast = index === group.members.length - 1;
            const isAdminRow = member.id === group.admin_id;
            const isLoggedInAdmin = user.id === group.admin_id;

            return (
              <List.AnimatedItem
                key={`members_${index}`}
                exiting={FadeOutDown}
                layout={Layout.springify()}
                size="large"
              >
                <List.Content>
                  <List.Text
                    size={16}
                    color={isAdminRow ? 'primary' : 'black'}
                  >
                    {member.name} {isAdminRow ? `(beheerder)` : null}
                  </List.Text>
                  <List.Subtext>{member.email}</List.Subtext>
                </List.Content>
                {isLoggedInAdmin && !isAdminRow ? (
                  <List.Action>
                    <Pressable
                      onPress={() => onRemoveUserFromGroup(member.name, member.id)}
                      disabled={isUpdating}
                    >
                      {({ pressed }) => (
                        <Min
                          width={24}
                          height={24}
                          style={isUpdating ? { opacity: 0.5 } : null}
                          fill={pressed ? theme.colors.red : undefined}
                        />
                      )}
                    </Pressable>
                  </List.Action>
                ) : null}
              </List.AnimatedItem>
            );
          })}
        </ScrollView>
      </FormLayout.Content>

      <FormLayout.Action insets={insets}>
        <ActionButton
          direction="right"
          variant="alternative"
          onPress={onRegenerateGroupCode}
          textSize={22}
          icon="refresh"
        >
          Nieuwe groepscode
        </ActionButton>
      </FormLayout.Action>
    </Container>
  );
}
