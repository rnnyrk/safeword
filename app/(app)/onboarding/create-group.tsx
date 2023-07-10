import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import { createGroup } from 'queries/groups';
import { generateInviteCode, validation } from 'src/utils';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

type GroupForm = {
  name: string;
};

export default function CreateGroup() {
  const router = useRouter();

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
    const groupCode = generateInviteCode(6);

    await createGroup({
      name: data.name,
      type: 'family',
      invite_code: groupCode,
    });

    router.push({
      pathname: '/(app)/onboarding/invite-members/[code]',
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
