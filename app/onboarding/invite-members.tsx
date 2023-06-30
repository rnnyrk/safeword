import { useRouter } from 'expo-router';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Pressable } from 'react-native';

import { validation, windowWidth } from 'services';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Add } from 'common/svg';
import { Text } from 'common/typography';
import { InviteMemberButtonContainer } from 'modules/onboarding/InviteMembers';

type InviteMembersForm = {
  members: {
    email: string;
  }[];
};

export default function InviteMembers() {
  const router = useRouter();

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
    console.log(data);

    fetch('http://localhost:54321/functions/v1/safeword-resend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.members),
    });

    // @TODO update finish_onboarding on user

    // router.push('/');
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
