import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import { getGroupByInviteCode } from 'queries/groups';
import { updateGroup } from 'queries/groups/mutate';
import { updateUser } from 'queries/users/mutate';
import { validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { Button } from 'common/interaction';
import { Container, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

type JoinGroupForm = {
  code: string;
};

export default function JoinGroupScreen() {
  const router = useRouter();
  const { user, setUser } = useSupabase();
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      // First fetch the group by the invite code, and check if already a member
      const { data: group } = await getGroupByInviteCode(data.code);

      if (!group || !user) {
        console.error('No group or user found');
        return;
      }

      if (group.members.includes(user.id)) {
        console.error('User is already a member of this group');
        return;
      }

      // Add current user to the group
      const { data: updatedGroup, error: updateGroupError } = await updateGroup({
        id: group.id,
        values: {
          members: [...group.members, user.id].join(','),
        },
      });

      // Update the user, because onboarding is now finished
      const { data: updatedUser, error: updateUserError } = await updateUser({
        email: user?.email,
        values: { finished_onboarding: true },
      });

      if (updatedUser) {
        setUser(updatedUser[0]);
      }

      router.push('/home/');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(true);
    }
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

        <Button
          onPress={handleSubmit(onSubmitCode)}
          isDisabled={isLoading}
        >
          Versturen
        </Button>
      </Container>
    </>
  );
}
