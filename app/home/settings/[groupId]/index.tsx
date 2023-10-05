import { useEffect, useState } from 'react';
import { useSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView } from 'react-native';
import { FadeOutDown, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupById } from 'queries/groups';
import { useRegenerateGroupCode, useUpdateGroup } from 'queries/groups/mutate';
import { useUpdateUser } from 'queries/users/mutate';
import theme from 'styles/theme';
import { getInviteCode } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, List, useToast } from 'common/interaction';
import { Container, Countdown, FormLayout } from 'common/layout';
import { Min } from 'common/svg';
import { Text } from 'common/typography';

export default function SettingsGroupScreen() {
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const params = useSearchParams<{ groupId: string }>();

  const { data: group } = useGroupById(params.groupId);
  const { mutateAsync: onUpdateGroup, isLoading: isUpdatingGroup } = useUpdateGroup();
  const { mutateAsync: onUpdateUser, isLoading: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: onRegenerateCode, isLoading: isRegeneratingCode } = useRegenerateGroupCode();

  const isUpdating = isUpdatingGroup || isUpdatingUser;

  const { user } = useSupabase();
  const isAdmin = user?.id === group?.admin_id;

  const [code, setCode] = useState<string | undefined>(undefined);
  let codeTimeout: NodeJS.Timeout | null = null;

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

  async function onRegenerateGroupCode() {
    if (!group || code) return;
    const groupCode = getInviteCode(6);

    const { data: updatedGroup, error: regenerateError } = await onRegenerateCode({
      id: group.id,
      invite_code: groupCode,
    });

    if (regenerateError) {
      toast.show({ message: 'Nieuwe code genereren mislukt' });
      console.error('Error regenerating code');
      return;
    }

    setCode(groupCode);
    codeTimeout = setTimeout(() => {
      setCode(undefined);
      codeTimeout = null;
    }, 30000);
  }

  useEffect(() => {
    return () => {
      codeTimeout && clearTimeout(codeTimeout);
    };
  }, []);

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
            color="darkGray"
            size={18}
            fontFamily={400}
            marginBottom={32}
          >
            Beheer je groepsleden, of genereer een nieuwe groepscode om mensen bij je groep te
            voegen.
          </Text>

          {group.members.map((member, index) => {
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

      {isAdmin && (
        <FormLayout.Action insets={insets}>
          <ActionButton
            direction="right"
            isLoading={isRegeneratingCode}
            isDisabled={!group || isRegeneratingCode || Boolean(code)}
            icon={isRegeneratingCode || code ? undefined : 'refresh'}
            onPress={onRegenerateGroupCode}
            textSize={22}
            variant="alternative"
            subChildren={code ? <Countdown /> : null}
          >
            {code ? code : 'Nieuwe groepscode'}
          </ActionButton>
        </FormLayout.Action>
      )}
    </Container>
  );
}
