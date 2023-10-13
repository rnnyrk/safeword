import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createGroup } from 'queries/groups/mutate';
import { getInviteCode, validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { ActionButton } from 'common/interaction';
import { Container, FormLayout } from 'common/layout';
import { Text } from 'common/typography';

type GroupForm = {
  name: string;
};

export default function NewGroupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { user } = useSupabase();
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
    // setLoading(true);

    // const groupCode = getInviteCode(6);

    // const { data: group, error } = await createGroup({
    //   name: data.name,
    //   invite_code: groupCode,
    //   userId: user.id,
    // });

    // if (error) {
    //   console.error(error);
    //   throw error;
    // }

    // setLoading(false);

    // router.push({
    //   pathname: '/onboarding/invite-members/[code]',
    //   params: {
    //     code: groupCode,
    //   },
    // });
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
