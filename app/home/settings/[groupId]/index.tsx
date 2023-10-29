import type * as i from 'types';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView } from 'react-native';
import { FadeOutDown, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupById } from 'queries/groups';
import { useDeleteGroup, useRegenerateGroupCode, useUpdateGroup } from 'queries/groups/mutate';
import { deleteAdmin, updateUser, useUpdateUser } from 'queries/users/mutate';
import theme from 'styles/theme';
import { getInviteCode, locales } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, List, useToast } from 'common/interaction';
import { Container, Countdown, FormLayout } from 'common/layout';
import { Min } from 'common/svg';
import { Text } from 'common/typography';

export default function SettingsGroupScreen() {
  const toast = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const params = useGlobalSearchParams<{ groupId: string }>();

  const { data: group } = useGroupById(params.groupId);
  const { mutateAsync: onDeleteGroup, isPending: isDeletingGroup } = useDeleteGroup();
  const { mutateAsync: onUpdateGroup, isPending: isUpdatingGroup } = useUpdateGroup();
  const { mutateAsync: onUpdateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: onRegenerateCode, isPending: isRegeneratingCode } = useRegenerateGroupCode();

  const isUpdating = isUpdatingGroup || isUpdatingUser;

  const { user } = useSupabase();
  const isAdmin = user?.id === group?.admin_id;

  const [code, setCode] = useState<string | undefined>(undefined);
  let codeTimeout: NodeJS.Timeout | null = null;

  function onConfirmRemoveUserFromGroup(name: string, removeMemberId: string) {
    Alert.alert(
      locales.t('settings_group.delete_user_title'),
      locales.t('settings_group.delete_user_description', { name }),
      [
        {
          text: locales.t('cancel_button'),
          style: 'cancel',
        },
        {
          text: locales.t('confirm_button'),
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

            // @TODO remove group id from the groups array
            const { data: updatedUser, error: updateUserError } = await onUpdateUser({
              email: removeMember.email,
              values: {
                groups: null, // so instead of null remove the group id from the array
              },
            });

            if (updateGroupError || updateUserError) {
              toast.show({ message: locales.t('settings_group.delete_user_error') });
              console.error('Error updating group after removing user');
              return;
            }
          },
        },
      ],
    );
  }

  function onConfirmDeleteGroup() {
    if (!group) return;

    Alert.alert(
      locales.t('settings_group.delete_group_title'),
      locales.t('settings_group.delete_group_description'),
      [
        {
          text: locales.t('cancel_button'),
          style: 'cancel',
        },
        {
          text: locales.t('confirm_button'),
          onPress: async () => {
            if (!group || !user) return;

            // First update the users, because only admins can update users and the admin will be deleted
            const userPromises: i.UserReturn[] = [];

            // Remove group id from the groups array
            group.members.forEach(async (member) => {
              if (!member.groups) return;
              const filteredUserGroups = member.groups
                .split(',')
                .filter((groupId) => groupId !== group.id);

              userPromises.push(
                updateUser({
                  email: member.email,
                  values: {
                    groups: filteredUserGroups.join(','),
                  },
                }),
              );
            });

            const updatedUsers = await Promise.all(userPromises);

            // Get current user from updated
            const updatedCurrentUser = updatedUsers.find((updatedUser) => {
              if (!updatedUser) return false;
              return updatedUser?.data?.[0].id === user.id;
            });

            // After that, remove admin. Because the group can't be deleted if the admin row still exists
            const { error: deleteAdminError } = await deleteAdmin({
              userId: user.id,
              groupId: group.id,
            });

            if (deleteAdminError) {
              toast.show({ message: locales.t('settings_group.delete_group_error') });
              console.error(deleteAdminError);
              return;
            }

            const { error: deleteGroupError } = await onDeleteGroup({
              id: group.id,
            });

            if (deleteGroupError) {
              toast.show({ message: locales.t('settings_group.delete_group_error') });
              console.error(deleteGroupError);
              return;
            }

            toast.show({
              message: locales.t('settings_group.delete_group_success'),
              variant: 'success',
            });

            if (updatedCurrentUser?.data?.[0].groups) {
              // If any groups left, invalidate groups to get fetch all remaining groups
              queryClient.invalidateQueries({
                queryKey: ['groups'],
              });

              router.push('/home/');
            } else {
              router.push('/onboarding/');
            }
          },
        },
      ],
    );
  }

  async function onRegenerateGroupCode() {
    if (!group || code) return;
    const groupCode = getInviteCode(6);

    const { data: updatedGroup, error: regenerateError } = await onRegenerateCode({
      id: group.id,
      invite_code: groupCode,
    });

    if (regenerateError) {
      toast.show({ message: locales.t('settings_group.regenerate_error') });
      console.error('Error regenerating code');
      return;
    }

    setCode(groupCode);
    codeTimeout = setTimeout(() => {
      // Refetch the group to get newly joined users
      queryClient.invalidateQueries({
        queryKey: ['groups'],
      });

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
            {isAdmin && locales.t('settings_group.manage')}
            {!isAdmin && locales.t('settings_group.overview')}
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
                    {member.name} {isAdminRow ? `(${locales.t('settings_group.admin')})` : null}
                  </List.Text>
                  <List.Subtext>{member.email}</List.Subtext>
                </List.Content>
                {isLoggedInAdmin && !isAdminRow ? (
                  <List.Action>
                    <Pressable
                      onPress={() => onConfirmRemoveUserFromGroup(member.name, member.id)}
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
          {!code && (
            <ActionButton
              direction="right"
              icon="delete"
              isDisabled={!group}
              isLoading={isDeletingGroup}
              onPress={onConfirmDeleteGroup}
              variant="delete"
              style={{ marginBottom: 16 }}
            >
              {locales.t('settings_group.delete_group')}
            </ActionButton>
          )}

          <ActionButton
            direction="right"
            icon={isRegeneratingCode || Boolean(code) ? null : 'refresh'}
            isDisabled={!group || isRegeneratingCode || Boolean(code)}
            isLoading={isRegeneratingCode}
            onPress={onRegenerateGroupCode}
            variant="secondary"
            subChildren={code ? <Countdown /> : null}
          >
            {code ? code : locales.t('settings_group.new_code')}
          </ActionButton>
        </FormLayout.Action>
      )}
    </Container>
  );
}
