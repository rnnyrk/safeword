import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import { createGroup } from 'queries/groups/mutate';
import { generateInviteCode, validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

type GroupForm = {
  name: string;
};

export default function CreateGroupScreen() {
  const router = useRouter();
  const { user } = useSupabase();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  async function onSubmitGroup(data: GroupForm) {
    if (!user) return;

    const groupCode = generateInviteCode(6);

    const { data: group, error } = await createGroup({
      name: data.name,
      invite_code: groupCode,
      userId: user.id,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    router.push({
      pathname: '/onboarding/invite-members/[code]',
      params: { code: groupCode },
    });
  }

  return (
    <>
      <LogoHeader />
      <Container>
        <Text
          align="center"
          color="primary"
          size={24}
        >
          Groep aanmaken
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 4 }}
        >
          Kies een naam
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
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmitGroup)}>Versturen</Button>
      </Container>
    </>
  );
}
