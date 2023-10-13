import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createGroup } from 'queries/groups/mutate';
import { createAdmin, updateUser } from 'queries/users/mutate';
import { getInviteCode, validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { ActionButton } from 'common/interaction';
import { Container, FormLayout, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function CreateGroupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { user, setUser } = useSupabase();
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

    // Create the group
    const { data: group, error: createGroupError } = await createGroup({
      name: data.name,
      invite_code: groupCode,
      userId: user.id,
    });

    if (createGroupError) {
      console.error(createGroupError);
      throw createGroupError;
    }

    const createdGroupId = group![0].id;

    // Update the current user and add the group id to the groups array
    const { data: updatedUser, error: updatedUserError } = await updateUser({
      email: user.email,
      values: {
        groups: createdGroupId,
      },
    });

    if (updatedUserError) {
      console.error(updatedUserError);
      throw updatedUserError;
    }

    if (updatedUser) {
      setUser(updatedUser[0]);
    }

    // Create an admin for the group
    const { data: admin, error: createAdminError } = await createAdmin({
      userId: user.id,
      groupId: createdGroupId,
    });

    if (createAdminError) {
      console.error(createAdminError);
      throw createAdminError;
    }

    setLoading(false);

    router.push({
      pathname: '/onboarding/invite-members/[code]',
      params: {
        code: groupCode,
      },
    });
  }

  return (
    <>
      <LogoHeader showBackButton />
      <Container alignItems="flex-start">
        <FormLayout.Content>
          <Text
            color="primary"
            size={32}
          >
            Groep aanmaken
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ ...validation.required, ...validation.groupName }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Naam van de groep"
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
            direction="right"
            isDisabled={isLoading || !isValid}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmitGroup)}
            variant="secondary"
          >
            Aanmaken
          </ActionButton>
        </FormLayout.Action>
      </Container>
    </>
  );
}

type GroupForm = {
  name: string;
};
