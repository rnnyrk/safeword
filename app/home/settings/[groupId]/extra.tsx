import type * as i from 'types';
import { useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupById } from 'queries/groups';
import { useDeleteGroup, useUpdateGroup } from 'queries/groups/mutate';
import { deleteAdmin, updateUser } from 'queries/users/mutate';
import { getNewSafeword, locales } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, useToast } from 'common/interaction';
import { Container, FormLayout } from 'common/layout';
import { Text } from 'common/typography';
import { LanguageSelector } from 'modules/settings';

export default function SettingsGroupExtraScreen() {
  const toast = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const params = useGlobalSearchParams<{ groupId: string }>();

  const { data: group } = useGroupById(params.groupId);
  const { mutateAsync: onUpdateGroup, isPending: isUpdatingGroup } = useUpdateGroup();
  const { mutateAsync: onDeleteGroup, isPending: isDeletingGroup } = useDeleteGroup();

  const { user } = useSupabase();
  const isAdmin = user?.id === group?.admin_id;

  function onConfirmDeleteGroup() {
    if (!group) return;

    Alert.alert(
      locales.t('settings_group_extra.delete_group_title'),
      locales.t('settings_group_extra.delete_group_description'),
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
              toast.show({ message: locales.t('settings_group_extra.delete_group_error') });
              console.error(deleteAdminError);
              return;
            }

            const { error: deleteGroupError } = await onDeleteGroup({
              id: group.id,
            });

            if (deleteGroupError) {
              toast.show({ message: locales.t('settings_group_extra.delete_group_error') });
              console.error(deleteGroupError);
              return;
            }

            toast.show({
              message: locales.t('settings_group_extra.delete_group_success'),
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

  function onChangeGroupLanguage(language: i.Language, onChangeCallback: () => void) {
    console.log(language);

    Alert.alert(
      locales.t('settings_group_extra.change_group_language_title'),
      locales.t('settings_group_extra.change_group_language_description'),
      [
        {
          text: locales.t('cancel_button'),
          style: 'cancel',
        },
        {
          text: locales.t('confirm_button'),
          onPress: async () => {
            if (!group) return;

            const { data: updatedGroup, error: updatedGroupError } = await onUpdateGroup({
              id: group.id,
              values: {
                language,
                current_word: getNewSafeword(language),
              },
            });

            if (updatedGroupError) {
              toast.show({ message: locales.t('settings_group_extra.update_group_error') });
              console.error(updatedGroupError);
              return;
            }

            onChangeCallback();
            toast.show({
              message: locales.t('settings_language.change_language_success'),
              variant: 'success',
            });
            router.push('/home/');
          },
        },
      ],
    );
  }

  if (!isAdmin) {
    router.push('/home/settings/');
    return null;
  }

  if (!group || !user) return null;

  return (
    <Container
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <FormLayout.Content>
        <ScrollView>
          <Text
            size={32}
            color="darkGray"
            marginTop={64}
            marginBottom={8}
          >
            {locales.t('settings_group_extra.group_language')}
          </Text>
          <Text
            color="darkGray"
            size={18}
            fontFamily={400}
            marginBottom={32}
          >
            {locales.t('settings_group_extra.group_description')}
          </Text>
          <LanguageSelector
            onChange={onChangeGroupLanguage}
            defaultLanguage={group.language}
          />
        </ScrollView>
      </FormLayout.Content>

      {isAdmin && (
        <FormLayout.Action insets={insets}>
          <ActionButton
            direction="right"
            icon="delete"
            isDisabled={isUpdatingGroup || isDeletingGroup}
            isLoading={isDeletingGroup}
            onPress={onConfirmDeleteGroup}
            variant="delete"
            style={{ marginBottom: 16 }}
          >
            {locales.t('settings_group_extra.delete_group')}
          </ActionButton>
        </FormLayout.Action>
      )}
    </Container>
  );
}
