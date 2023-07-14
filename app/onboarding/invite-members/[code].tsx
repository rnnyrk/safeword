import { useRouter, useSearchParams } from 'expo-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';

import { updateUser } from 'queries/users';
import { getApiUrl, validation, windowWidth } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Add } from 'common/svg';
import { Text } from 'common/typography';

type InviteMembersForm = {
  members: {
    email: string;
  }[];
};

export default function InviteMembers() {
  const router = useRouter();
  const params = useSearchParams<{ code: string; name: string }>();
  const { user } = useSupabase();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      members: [
        {
          email: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  async function onInviteMembers(data: InviteMembersForm) {
    console.log({ user, data, url: `${getApiUrl}/api/mail` });
    if (!user) return;

    const req = await fetch(`${getApiUrl}/api/mail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: params.code,
        members: data.members,
      }),
    });

    const mailResponse = await req.json();

    const updated = await updateUser({
      email: user?.email,
      values: { finished_onboarding: true },
    });

    router.push('/home/');
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
          style={{ marginTop: 4, marginBottom: 16 }}
        >
          Uitnodigingen versturen
        </Text>

        {fields.map((field, index) => {
          return (
            <Controller
              key={`members.${index}.email`}
              name={`members.${index}.email`}
              control={control}
              rules={{ ...validation.required }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Input
                    marginBottom="4px"
                    marginTop="4px"
                    style={{ width: windowWidth - 64 }}
                    placeholder="naam@email.com"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    error={errors.members?.[index]?.email}
                    icon={
                      <Add
                        width={24}
                        height={24}
                      />
                    }
                    onIconClick={() => remove(index)}
                  />
                );
              }}
            />
          );
        })}

        <Pressable
          onPress={() => append({ email: '' })}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <Add
            width={40}
            height={40}
          />
        </Pressable>

        <Button onPress={handleSubmit(onInviteMembers)}>Uitnodigen</Button>
      </Container>
    </>
  );
}
