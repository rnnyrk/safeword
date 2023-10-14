import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createGroup } from 'queries/groups/mutate';
import { useUpdateUser } from 'queries/users/mutate';
import { getInviteCode, validation } from 'src/utils';
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
      toast.show({ message: 'Groep verwijderen mislukt' });
      console.error(createGroupError);
      return;
    }

    let newGroups = [group![0].id];
    if (user?.groups) {
      newGroups = [...user.groups.split(','), group![0].id];
    }

    const { data: updatedUser, error: updatedUserError } = await onUpdateUser({
      email: user.email,
      values: {
        groups: newGroups.join(','),
      },
    });

    if (updatedUserError) {
      toast.show({ message: 'Profiel aanpassen mislukt' });
      console.error(updatedUserError);
      return;
    }

    setLoading(false);

    // Invalidate groups to get fetch all new groups
    queryClient.invalidateQueries(['groups']);

    toast.show({ message: 'Nieuwe groep aangemaakt', variant: 'success' });
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
            Nieuwe groep
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ ...validation.required }}
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
            onPress={handleSubmit(onSubmitGroup)}
            isDisabled={isLoading || !isValid}
            direction="right"
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
