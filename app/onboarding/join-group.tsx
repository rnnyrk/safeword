import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import { createGroup } from 'queries/groups';
import { validation } from 'src/utils';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

type JoinGroupForm = {
  code: string;
};

export default function JoinGroup() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  async function onSubmitCode(data: JoinGroupForm) {
    // await createGroup({
    //   name: data.name,
    //   type: 'family',
    // });

    // @TODO update finish_onboarding on user

    router.push('/');
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
          Groep joinen
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 4 }}
        >
          Voer de sleutelcode in die je via e-mail hebt ontvangen
        </Text>

        <Controller
          name="code"
          control={control}
          rules={{ ...validation.required }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.code}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmitCode)}>Versturen</Button>
      </Container>
    </>
  );
}
