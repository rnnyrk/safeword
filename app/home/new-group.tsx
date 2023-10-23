import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createGroup } from 'queries/groups/mutate';
import { createAdmin, useUpdateUser } from 'queries/users/mutate';
import { getInviteCode, locales, validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { ActionButton, useToast } from 'common/interaction';
import { Container, FormLayout } from 'common/layout';
import { Text } from 'common/typography';

export default function NewGroupScreen() {
  const router = useRouter();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const { user } = useSupabase();
  const queryClient = useQueryClient();

  const { mutateAsync: onUpdateUser, isLoading: isUpdatingUser } = useUpdateUser();
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  async function onSubmitGroup(data: GroupForm) {
    if (!user) return;
    setLoading(true);

    const groupCode = getInviteCode(6);

    const { data: group, error: createGroupError } = await createGroup({
      name: data.name,
      invite_code: groupCode,
      userId: user.id,
    });

    if (createGroupError) {
      toast.show({ message: locales.t('new_group.delete_error') });
      console.error(createGroupError);
      return;
    }

    const createdGroupId = group![0].id;

    let newGroups = [createdGroupId];
    if (user?.groups) {
      newGroups = [...user.groups.split(','), createdGroupId];
    }

    const { data: updatedUser, error: updatedUserError } = await onUpdateUser({
      email: user.email,
      values: {
        groups: newGroups.join(','),
      },
    });

    if (updatedUserError) {
      toast.show({ message: locales.t('new_group.update_error') });
      console.error(updatedUserError);
      return;
    }

    // Create an admin for the group
    const { data: admin, error: createAdminError } = await createAdmin({
      userId: user.id,
      groupId: createdGroupId,
    });

    if (createAdminError) {
      // @TODO create-group and new-group (this) submits are exactly the same..
      toast.show({ message: locales.t('new_group.admin_error') });
      console.error(createAdminError);
      throw createAdminError;
    }

    setLoading(false);

    // Invalidate groups to get fetch all new groups
    queryClient.invalidateQueries(['groups']);

    toast.show({ message: locales.t('new_group.success'), variant: 'success' });
    router.push({ pathname: '/home/' });
  }

  return (
    <>
      <Container alignItems="flex-start">
        <FormLayout.Content>
          <Text
            color="primary"
            size={32}
          >
            {locales.t('new_group.label')}
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ ...validation.required }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={locales.t('new_group.placeholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name}
                style={{ width: '100%' }}
              />
            )}
          />
        </FormLayout.Content>

        <FormLayout.Action insets={insets}>
          <ActionButton
            onPress={handleSubmit(onSubmitGroup)}
            isDisabled={isLoading || !isValid}
            direction="right"
            variant="secondary"
          >
            {locales.t('new_group.submit')}
          </ActionButton>
        </FormLayout.Action>
      </Container>
    </>
  );
}

type GroupForm = {
  name: string;
};
