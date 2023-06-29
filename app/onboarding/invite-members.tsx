import { useRouter } from 'expo-router';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Pressable } from 'react-native';

import { validation } from 'services';
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
          Groep aanmaken
        </Text>
        <Text
          align="center"
          color="darkGray"
          size={24}
          style={{ marginTop: 4 }}
        >
          Uitnodigingen versturen
        </Text>

        {fields.map((field, index) => {
          return (
            <Controller
              name={`members.${index}.email`}
              control={control}
              rules={{ ...validation.required }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Input
                    placeholder="naam@email.com"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.members?.[index]?.email}
                  />
                );
              }}
            />
          );
        })}

        <Pressable
          onPress={() => append({ email: '' })}
          style={{ marginBottom: 16 }}
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
